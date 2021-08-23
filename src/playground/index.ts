import { PlaygroundContext } from '../context'
import * as custom from './custom'

export const runPlayground = async (context: PlaygroundContext): Promise<any> => {
  const { cluster, bucket, collection, responses, exec } = context
  Object.assign(context, custom)
  let resp: any

  // console.log(cluster)
  // console.log(bucket)
  // console.log(collection)
  // await displayClusterInfo(cluster)

  // if (collection) {
  //   resp = await custom.userById(collection, 'someUserId-123456')
  //   responses.push(resp)
  // }
}
