/* eslint no-console: 0 */
import 'colors'
import { exec } from 'child-process-promise'

const SIGINT = 'SIGINT'
let processMap = {}

function output(prefix, message) {
  let formattedMessage = message.toString().trim().split('\n')
    .reduce((acc, line) => `${acc}${ acc !== '' ? '\n' : '' }${prefix} ${line}`, '')

  console.log(formattedMessage)
}

function listen({stdout, stderr}, name) {
  stdout.on('data', data => output(`[${name}] `.grey, data))
  stderr.on('data', data => output(`[${name}] `.grey, data))
}

function shutdown() {
  Object.values(processMap).forEach(process => process.kill(SIGINT))
}

function catchExec(name, err) {
  if (err.killed) {
    console.log('Shutdown: '.cyan + name.green)
    shutdown()
    return false
  }

  console.log(`${name} -- Failed`.red)
  console.log(err.toString().red)
  return true
}

function runCmd(name, cmd, options) {
  return exec(cmd, options)
    .progress(childProcess => {
      listen(childProcess, name)
      processMap[name] = childProcess
      return
    })
    .then(() => console.log('Shutdown: '.cyan + name.green))
    .catch(err => {
      if (catchExec(name, err)) {
        // Restart if not explicitly shutdown
        runCmd(name, cmd, options)
      }
    })
}

console.log('Building docs for production'.cyan)

process.on(SIGINT, shutdown)

const env = {
  ...process.env,
  NODE_ENV: 'production'
}

const isWin = process.platform === "win32"
const prefix = isWin ? 'call ' : ''
const extension = isWin ? '.cmd' : ''

runCmd('docs-server', `${prefix}node_modules/.bin/babel-node${extension} scripts/server.js`, { env }).then(() => {
  console.log('Building webpack for production'.cyan)
  return runCmd('webpack', `${prefix}node_modules/.bin/webpack${extension} -p --config scripts/webpack.config.js`, { env })
})
