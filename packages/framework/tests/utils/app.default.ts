import 'reflect-metadata'

import Koa from 'koa'
import { Container, injectable } from 'inversify'
import { interfaces, controller, httpGet } from 'inversify-koa'
import { RouterContext } from 'koa-router'
import { TYPE, IEnvironmentConfig, AbstractKoaServer, bodyparser } from '../../src/index'

@injectable()
@controller('/')
export class IndexController implements interfaces.Controller {
  @httpGet('')
  async getIndex (ctx: RouterContext) {
    ctx.status = 200
    ctx.body = {
      up: process.uptime(),
      message: 'hello'
    }
  }
}

export const container = new Container()
container.bind<interfaces.Controller>(TYPE.Controller).to(IndexController).whenTargetNamed('IndexController')

export const env: IEnvironmentConfig = {
  ENVIRONMENT: 'test',
  PORT: 8888
}

export class Application extends AbstractKoaServer {
  constructor (env: IEnvironmentConfig) {
    super(env)
  }
  async applyMiddleware(koa: Koa, container: Container): Promise<void> {
    koa.use(bodyparser())
  }
}
