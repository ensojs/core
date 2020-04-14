import Koa from 'koa'
import http from 'http'
import { Container } from 'inversify'
import { InversifyKoaServer } from 'inversify-koa'
import { Connection } from 'typeorm'
import { Server } from 'http'
import Debug from 'debug'

import { IEnvironmentConfig } from '../env'
import { TYPE } from '../bindings'

const debug = Debug('enso:AbstractKoaServer')

export abstract class AbstractKoaServer {

  koa: Koa | undefined

  server: Server | undefined

  container: Container | undefined

  connections: Connection[] = []

  constructor (
    public env: IEnvironmentConfig
  ) {}

  /**
   * Force middleware to be declared
   */
  abstract applyMiddleware (koa: Koa, container: Container): void

  private listBindings (bindings: any) {
    for (const index in bindings) {
      if (bindings.hasOwnProperty(index)) {
        const _binding = bindings[index]
        debug(` => ${_binding.constructor.name}`)
      }
    }
  }

  private listRegisteredBindings(container: Container): void {
    debug(`listRegisteredControllers()`)
    try {
      this.listBindings(container.getAll(TYPE.Controller))
    } catch {
      debug(' => No controllers registered')
    }

    debug('listRegisteredWebSockets()')
    try {
      this.listBindings(container.getAll(TYPE.WebSocketController))
    } catch {
      debug(' => No web sockets registered')
    }
  }

  async build (container: Container): Promise<Koa> {

    this.listRegisteredBindings(container)

    const koa = new InversifyKoaServer(container)

    // TODO: FIX TYPINGS
    // @ts-ignore
    koa.setConfig(koa => this.applyMiddleware(koa, container))
    // @ts-ignore
    this.koa = koa.build()

    if (!this.koa) throw new Error('Unable to build Koa')
    return this.koa
  }

  /**
   * Return an instance of a container
   */
  public getInjectionContainer (): Container {
    if (!this.container) throw new Error('No container supplied')
    return this.container
  }

  public async start (): Promise<http.Server> {
    if (!this.koa) throw new Error('Unable to start. Koa has not been built.')
    this.server = await this.koa.listen(this.env.PORT)
    return this.server
  }

  public async stop () {
    // Gracefully close any open connections
    if (this.connections.length > 0) {
      this.connections.map(o =>o.close())
    }
    // TODO: Gracefully shutdown the server
    if (this.server) {
      this.server.close()
    }
  }
}
