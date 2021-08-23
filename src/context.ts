import { createLogFunc } from './helpers/logger'
import { createExecHelperForContext } from './helpers/terminal'
import { CouchbaseConfig } from './config'
import { Cluster, Bucket, Collection, connectToCluster, connectToBucket, connectToCollection } from './database'

export class PlaygroundContext {
  public cluster?: Cluster
  public bucket?: Bucket
  public collection?: Collection
  public responses: any[] = []
  public exec: any

  constructor() {
    this.exec = createExecHelperForContext(this)
  }
}

export const createContext = async (config: CouchbaseConfig): Promise<PlaygroundContext> => {
  const context = new PlaygroundContext()
  context.cluster = await connectToCluster({
    ...config,
    logFunc: createLogFunc(/severity:.1/)
  })
  context.bucket = connectToBucket(context.cluster, config.bucketName)
  context.collection = connectToCollection(context.bucket)
  return context
}
