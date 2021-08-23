import { Bucket, Collection } from 'couchbase'

export const connectToCollection = (bucket: Bucket): Collection => {
  console.log(`connecting to collection: defaultCollection`)
  const collection = bucket.defaultCollection()
  return collection
}
