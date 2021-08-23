import { readBoolean, readString } from './helpers'

export interface CouchbaseConfig {
  usingSSL: boolean
  endpoint: string
  username: string
  password: string
  bucketName: string
}

export const loadCouchbaseDefaultConfig = (): string => {
  return readString('COUCHBASE_DEFAULT')
}

export const loadCouchbaseLocalConfig = (): CouchbaseConfig => {
  return {
    usingSSL: readBoolean('COUCHBASE_LOCAL_SSL', false),
    endpoint: readString('COUCHBASE_LOCAL_URL', ''),
    username: readString('COUCHBASE_LOCAL_USER', ''),
    password: readString('COUCHBASE_LOCAL_PASS', ''),
    bucketName: readString('COUCHBASE_LOCAL_BUCKET')
  }
}

export const loadCouchbaseRemoteConfig = (): CouchbaseConfig => {
  return {
    usingSSL: readBoolean('COUCHBASE_REMOTE_SSL', false),
    endpoint: readString('COUCHBASE_REMOTE_URL', ''),
    username: readString('COUCHBASE_REMOTE_USER', ''),
    password: readString('COUCHBASE_REMOTE_PASS', ''),
    bucketName: readString('COUCHBASE_REMOTE_BUCKET')
  }
}
