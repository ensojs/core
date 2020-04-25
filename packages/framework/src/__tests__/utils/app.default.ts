import 'reflect-metadata'

import { Container, injectable } from 'inversify'
import { interfaces, controller, httpGet } from 'inversify-koa'
import { RouterContext } from 'koa-router'

import { TYPE } from '../../bindings'
import { IEnvironmentConfig } from '../../env'
import { getRandomPort } from '../../utils/getRandomPort'
import { KoaServer } from '../../server/KoaServer'

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
  PORT: getRandomPort()
}

export class Application extends KoaServer {
  constructor (env: IEnvironmentConfig) {
    super(env)
  }
}
