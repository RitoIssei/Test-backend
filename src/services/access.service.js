const shopModel = require('../models/user.model')

class AccessService {
  static async signUp({ name, email, password }) {
    try {
      const hodelUser = await shopModel.findOne({ email }).lean()
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
}

module.exports = AccessService
