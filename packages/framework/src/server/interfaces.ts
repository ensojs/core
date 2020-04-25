import { Container } from 'inversify'
import http from 'http'
import Koa from 'koa'

export interface BaseServer {
  build (container: Container): Promise<Koa>
  getInjectionContainer (): Container
  start (): Promise<http.Server>
  stop (): Promise<void>
}

export interface GlobalMiddleware {
  middleware (koa: Koa, container?: Container): Promise<void>
}

