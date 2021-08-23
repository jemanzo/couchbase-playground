import { Cluster, Bucket } from 'couchbase'

export const connectToBucket = (cluster: Cluster, bucketName: string): Bucket => {
  console.log(`connecting to bucket: ${bucketName}`)
  return cluster.bucket(bucketName)
}
