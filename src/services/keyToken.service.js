const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
  static async createKeyToken(userId, puplicKey) {
    try {
      console.log(puplicKey, 6969)
      const publicKeyString = puplicKey.toString()
      console.log(publicKeyString)

      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString
      })
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}

module.exports = KeyTokenService
