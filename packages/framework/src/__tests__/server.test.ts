import net from 'net'

import { Application, env, container } from './utils/app.default'
import { AbstractKoaServer } from '../server'

describe('server', () => {

  test('should create a Koa server', async () => {
    const app = new Application(env)
    await app.build(container)
    expect(app).toBeInstanceOf(AbstractKoaServer)
  })

  test('should listen on supplied port', async () => {
    env.PORT = 5432

    const app = new Application(env)
    await app.build(container)
    const server = await app.start()
    const address = server.address() as net.AddressInfo

    expect(server.listening).toBe(true)
    expect(address.port).toBe(env.PORT)

    // stop the server
    app.stop()
  })

})
