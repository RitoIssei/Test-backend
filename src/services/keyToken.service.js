const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
  static async createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    try {
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // })
      // return tokens ? tokens.publicKey : null
      const filter = { user: userId }
      const update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken }
      const option = { upsert: true, new: true }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, option)

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }
}

module.exports = KeyTokenService
