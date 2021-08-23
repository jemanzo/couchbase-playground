import { Cluster, Collection, SearchQuery } from '../database'

// N1QL Queries
const myQueries = [`SELECT * FROM mybucket LIMIT 1`]

export const userById = async (collection: Collection, id: string): Promise<any> => {
  return collection.get(id)
}
