import { SuperTest, Test } from 'supertest'
import { Connection } from 'typeorm'

import { AbstractKoaServer } from '../server/AbstractKoaServer'

// import Debug from 'debug'
// const debug = Debug('enso:TestHarness')

// const PORT_MAX = 25555
// const PORT_MIN = 20000

// const getRandomPort = () => Math.floor(Math.random() * (PORT_MAX - PORT_MIN) + PORT_MIN)
// const getRandomString = () => Math.random().toString(36).substring(2)

// const configureTestConnection = (databaseOptions: ConnectionOptions) => ({
//   ...databaseOptions,
//   port: getRandomPort(),
//   database: `tmp-${getRandomString()}`
// } as ConnectionOptions)

export class TestHarness {

  request: SuperTest<Test> | undefined

  rootConnection: Connection | undefined

  testConnection: Connection | undefined

  testDatabase: string
  // List of tokens used to interfaced with the API
  | undefined

  // List of tokens used to interfaced with the API
  tokens = []

  constructor (
    public app: AbstractKoaServer,  // TODO: Ensure that App is an instance of ServerAbstract
    public connectionName: string = 'root-connection'
  ) {}

  // // TODO: Support all typeorm databases
  // async setupTestDatabase () {
  //   // First, connect to a default database so that it does not error for non-existant databases
  //   this.rootConnection = await createConnection({
  //     ...this.app.connectionOptions,
  //     name: this.connectionName,
  //     database: 'postgres', // Connect to maintenance DB to create temp test DB
  //     logging: false
  //   } as ConnectionOptions)

  //   // Create a temporary database
  //   // TODO: Sanitize this input into a direct query
  //   // Also consider moving to truncate vs. drop/recreate
  //   // Sample code: https://github.com/nestjs/nest/issues/409
  //   let createTestDatabase = `CREATE DATABASE "${this.testDatabase}";`
  //   debug(`Creating tmp database with:`, createTestDatabase)
  //   await this.rootConnection.query(createTestDatabase)

  //   let testConnectionOptions = await getConnectionOptions('test')

  //   // Open a new connection to the test database and run migrations
  //   this.testConnection = await createConnection(
  //     configureTestConnection(testConnectionOptions)
  //   )

  //   return this.testConnection
  // }

  // async setup () {
  //   debug('TestHarness.setup() start')

  //   if (!this.app.connectionOptions) {
  //     debug('No connection found skipping database config...')
  //   } else {
  //     await this.setupTestDatabase()
  //     await this.testConnection.runMigrations()
  //   }

  //   // Start the app against the new database
  //   let app = await this.app.start()
  //   // inject the app to supertest so we can make requests to it
  //   this.request = supertest(app)

  //   return {
  //     server: app,
  //     container: this.app.getInjectionContainer()
  //   }
  // }

  // async destroy () {
  //   debug('TestHarness.destroy() start')
  //   // Stop the app, close any open connections
  //   this.app.stop()

  //   // Close the connection to the test database
  //   await this.testConnection.close()

  //   // Drop the test database
  //   await this.rootConnection.query(`DROP DATABASE "${this.testDatabase}";`)

  //   // Close main connection
  //   await this.rootConnection.close()
  // }
}
