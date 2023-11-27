require('dotenv').config()
const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const mongodb = require('./dbs/init.mongodb')
const bodyParser = require('body-parser')

const app = express()
// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
// connect db
mongodb.connect()
// init routes
app.use('', require('./routes'))
// handling error

module.exports = app
