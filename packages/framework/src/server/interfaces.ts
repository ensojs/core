import { Connection } from 'typeorm'

export interface IEnsoServer {
  setConnection (connection: Connection): void
}

