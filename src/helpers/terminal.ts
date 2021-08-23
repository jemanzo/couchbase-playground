import repl from 'repl'
import chalk from 'chalk'

export const startTerminal = (prompt: string, context?: any, tips?: string[]): repl.REPLServer => {
  if (tips) {
    console.log('')
    if (Array.isArray(tips)) {
      for (let i = 0; i < tips.length; i++) {
        console.log(tips[i])
      }
    } else {
      console.log(tips)
    }
    console.log('')
  }
  prompt = `${chalk ? chalk.yellowBright(prompt) : prompt} > `
  const replServer = repl.start({ prompt, useGlobal: true, ignoreUndefined: true })
  if (context) {
    Object.assign(replServer.context, context)
  }
  replServer.displayPrompt()
  return replServer
}

// A exec() function to help with async call in REPL environment
export const createExecHelperForContext = (context: any) => {
  return function exec(promise: Promise<any>): void {
    promise
      .then(res => {
        context.responses = res
        console.log(res)
      })
      .catch(err => {
        console.log('======== RUN ERROR =========')
        console.log(err)
      })
  }
}
