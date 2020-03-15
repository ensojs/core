import Koa from 'koa'
import http from 'http'
import { Container } from 'inversify'
import { InversifyKoaServer } from 'inversify-koa'
import { Connection, ConnectionOptions, createConnection } from 'typeorm'
import { Server } from 'http'
import Debug from 'debug'

import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions'
import { IEnvironmentConfig } from '../env'
import { TYPE } from '../bindings'

const debug = Debug('enso:AbstractKoaServer')

export abstract class AbstractKoaServer {

  /**
   * Instance of Koa
   */
  koa: Koa | undefined


  connection: Connection | undefined

  server: Server | undefined

  container: Container | undefined

  connectionOptions?: ConnectionOptions | PostgresConnectionCredentialsOptions

  /**
   * Server is ready to be started
   */
  isReady: boolean = false

  constructor (
    public env: IEnvironmentConfig
  ) {}

  /**
   * Force the User to define how middleware is implemented
   *
   * @param koa
   * @param container
   */
  abstract applyMiddleware (koa: Koa, container: Container): void


  listBindings (bindings) {
    for (const index in bindings) {
      if (bindings.hasOwnProperty(index)) {
        const _binding = bindings[index]
        debug(` => ${_binding.constructor.name}`)
      }
    }
  }

  private async initialiseKoa (container: Container): Promise<Koa> {
    const koa = new InversifyKoaServer(container)

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

    koa.setConfig(koa => this.applyMiddleware(koa, container))
    return koa.build()
  }

  async initiateDatabaseConnection (connectionOptions: ConnectionOptions): Promise<Connection> {
    this.connection = await createConnection({
      ...connectionOptions
      // logging: false
    })
    return this.connection
  }

  async build (container: Container): Promise<void> {
    // koa
    this.koa = await this.initialiseKoa(container)
    this.isReady = true
  }

  /**
   * Return an instance of a container
   */
  getInjectionContainer (): Container {
    return this.container
  }

  async start (): Promise<http.Server> {
    this.server = await this.koa.listen(this.env.PORT)
    return this.server
  }

  async stop () {
    if (this.server) {
      this.server.close()
    }
    if (this.connection) {
      this.connection.close()
    }
  }
}
