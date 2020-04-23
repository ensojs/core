import { Container } from 'inversify'
import http from 'http'
import Koa from 'koa'

export interface DefaultServer {
  build (container: Container): Promise<Koa>
  getInjectionContainer (): Container
  start (): Promise<http.Server>
  stop (): Promise<void>
}

