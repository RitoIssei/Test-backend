'use strict'

const mongoose = require('mongoose')
const { countConnect, checkOverload } = require('../helpers/check.connect')
const { db: { host, port, name } } = require('../configs/config.general')
const connectString = `mongodb://${host}:${port}/${name}`

class Database {
  // constructor() {
  //   this.connect()
  // }
  connect(type = 'mongodb') {
    mongoose.connect(connectString, {
      maxPoolSize: 50
    })
      .then(res => {
        console.log(port ?? 0 > 1);
        console.log(`Connected Mongodb Success,`)
        countConnect()
        // checkOverload()
      })
      .catch(err => console.log(`Error Connect!`))
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const mongodb = Database.getInstance()
module.exports = mongodb