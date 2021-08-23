import { loadConfig } from './config'
import { createContext, PlaygroundContext } from './context'
import { startTerminal } from './helpers/terminal'
import { runPlayground } from './playground'

let context: PlaygroundContext

const start = async () => {
  const config = loadConfig()
  context = await createContext(config.couchbase_local)
  await runPlayground(context)
  return config
}

start()
  .then(config => {
    // NodeJS REPL Terminal
    if (config.terminal.enabled) {
      const replServer = startTerminal(config.terminal.displayStr)
      Object.assign(replServer.context, context)
    }
  })
  .catch(err => {
    console.log('==== GLOBAL ERROR =====')
    console.log(err)
    context.cluster?.close()
    process.exit()
  })

process.on('exit', _ => {
  context.cluster?.close()
})

process.on('uncaughtException', function (err) {
  console.log('==== GLOBAL ERROR =====')
  console.log('Caught exception: ' + err)
  context.cluster?.close()
  process.exit()
})
