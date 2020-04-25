import net from 'net'
import { Application, env, container } from '../__tests__/utils/app.middleware'
import { KoaServer } from '../server/KoaServer'

describe('server with middleware', () => {

  test('should create a Koa server', async () => {
    const app = new Application(env)
    await app.build(container)
    expect(app).toBeInstanceOf(KoaServer)
  })

  test('should listen on supplied port', async () => {
    const app = new Application(env)
    await app.build(container)
    const server = await app.start()
    const address = server.address() as net.AddressInfo

    expect(server.listening).toBe(true)
    expect(address.port).toBe(env.PORT)

    // stop the server
    app.stop()
  })

  test('applies middleware with expected args', async () => {
    const app = new Application(env)
    const middlewareSpy = jest.spyOn(app, 'middleware')
    await app.build(container)
    await app.start()

    expect(middlewareSpy).toBeCalled()

    // TODO: Find a better way to test relevant meiddleware has been loaded
    const koaInstance = middlewareSpy.mock.calls[0][0]
    expect(koaInstance.middleware.length).toEqual(3)

    const arg2 = middlewareSpy.mock.calls[0][1]
    expect(arg2).toBe(container)

    app.stop()
  })

})
