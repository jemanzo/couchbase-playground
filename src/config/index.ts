import * as dotenv from 'dotenv'
import { loadTerminalConfig, TerminalConfig } from './env/terminal'
import {
  CouchbaseConfig,
  loadCouchbaseDefaultConfig,
  loadCouchbaseLocalConfig,
  loadCouchbaseRemoteConfig
} from './env/couchbase'

dotenv.config()

export type { CouchbaseConfig }

export interface PlaygroundConfig {
  terminal: TerminalConfig
  couchbase: string
  couchbase_local: CouchbaseConfig
  couchbase_remote: CouchbaseConfig
}

export const CONFIG = {
  terminal: loadTerminalConfig(),
  couchbase: loadCouchbaseDefaultConfig(),
  couchbase_local: loadCouchbaseLocalConfig(),
  couchbase_remote: loadCouchbaseRemoteConfig()
}

export const loadConfig = (): PlaygroundConfig => {
  let dbconfig: CouchbaseConfig
  if (CONFIG.couchbase === 'local') {
    dbconfig = CONFIG.couchbase_local
  } else if (CONFIG.couchbase === 'remote') {
    dbconfig = CONFIG.couchbase_remote
  } else {
    throw new Error('Couchbase default config is not set in your ".env" file')
  }
  return CONFIG
}
