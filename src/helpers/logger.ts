interface CouchbaseLogData {
  severity: number
  srcFile: string
  srcLine: number
  subsys: string
  message: string
}

type CouchbaseLogDataFields = 'severity' | 'srcFile' | 'srcLine' | 'subsys' | 'message'

// Example of SDK version 3.2 LogData
// {
//   severity: 1,
//   srcFile: '../deps/lcb/src/bucketconfig/confmon.cc',
//   srcLine: 94,
//   subsys: 'confmon',
//   message: 'Preparing providers (this may be called multiple times)'
// }

export const createLogFunc = (filter?: RegExp) => {
  return (data: CouchbaseLogData): void => {
    if (filter) {
      const dataStr = JSON.stringify(data)
      if (!dataStr.match(filter)) {
        return
      }
    }
    console.log(`subsys: ${data.subsys} msg: ${data.message}`)
  }
}
