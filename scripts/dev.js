/* eslint-disable no-console, no-process-exit */

import 'colors'
import portfinder from 'portfinder'
import { exec } from 'child-process-promise'
import ip from 'ip'

portfinder.basePort = 4000

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
  exec(cmd, options)
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

console.log('Starting docs in Development mode'.cyan)

process.on(SIGINT, shutdown)

portfinder.getPorts(2, {}, (portFinderErr, [docsPort, webpackPort]) => {
  if (portFinderErr) {
    console.log('Failed to acquire ports'.red)
    process.exit(1)
  }

  runCmd('webpack-dev-server', `node_modules/.bin/nodemon --watch webpack --watch scripts/webpack.config.js --exec webpack-dev-server -- --config scripts/webpack.config.js --color --port ${webpackPort} --debug --hot --host ${ip.address()}`)

  runCmd('docs-server', 'node_modules/.bin/nodemon --watch components --watch sections -e js,jsx --exec babel-node scripts/server.js', {
    env: {
      PORT: docsPort,
      WEBPACK_DEV_PORT: webpackPort,
      ...process.env
    }
  })
})
