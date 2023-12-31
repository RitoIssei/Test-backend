const process = require('process')
const mongoose = require('mongoose')
const os = require('os')
const _SECONDS = 5000

function countConnect() {
  const numConnection = mongoose.connections.length
  console.log(`Number of connections::${numConnection}`)
}

function checkOverload() {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const menoryUsage = process.memoryUsage().rss
    const maxConnections = numCores * 5

    console.log(`Active connections:: ${numConnection}`)
    console.log(`Memory usage:: ${menoryUsage / 1024 / 1024} MB`)
    if (numConnection > maxConnections) {
      console.log('Connection overload detected!')
    }
  }, _SECONDS)
}

module.exports = {
  countConnect,
  checkOverload
}
