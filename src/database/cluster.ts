import { lcbVersion, connect, Cluster, LogFunc } from 'couchbase'

export interface ConnectionConfig {
  usingSSL: boolean
  endpoint: string
  username: string
  password: string
  logFunc?: LogFunc
}

export const connectToCluster = async (config: ConnectionConfig, logFunc?: LogFunc): Promise<Cluster> => {
  console.log(`Couchbase LCB Ver. ${lcbVersion}`)
  const { usingSSL, endpoint, username, password } = config
  console.log(`config(usingSSL): ${usingSSL}`)
  console.log(`config(endpoint): ${endpoint}`)
  console.log(`config(username): ${username}`)
  // Connection String --------------------------------
  // -- the "ssl=no_verify" option is causing problems in SDK ver. 3.2
  // example: "couchbases://localhost?ssl=no_verify&console_log_level=5"
  const protocol = usingSSL ? 'couchbases://' : 'couchbase://'
  const connOpts = ''
  const connStr = `${protocol}${endpoint}${connOpts}`
  console.log(`connecting to cluster: ${connStr}`)
  return connect(connStr, { username, password, logFunc })
}

export const displayClusterInfo = async (cluster: Cluster) => {
  console.log('==== CLUSTER ==========================')
  console.log(cluster)

  console.log('==== CLUSTER PING =====================')
  const pingResponse = cluster.ping()
  console.log(pingResponse)

  console.log('==== CLUSTER BUCKETS ==================')
  const bucketManager = cluster.buckets()
  const buckets = bucketManager.getAllBuckets()
  console.log(buckets)
}

export const createPrimaryIndex = async (cluster: Cluster, bucketName: string) => {
  // Create a N1QL Primary Index (but ignore if it exists)
  await cluster.queryIndexes().createPrimaryIndex(bucketName, { ignoreIfExists: true })
}

export const performQueryN1QL = async (cluster: Cluster, queryStr: string) => {
  // Perform a N1QL Query
  const options = { parameters: ['myParams'] }
  let queryResult = await cluster.query(queryStr, options)
  queryResult.rows.forEach(row => {
    console.log('Query row: ', row)
  })
  return queryResult
}
