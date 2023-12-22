const keyTokenModel = require('../models/keyToken.model')
const { Types } = require('mongoose')

class KeyTokenService {
  static async createKeyToken({ userId, publicKey, privateKey, refreshToken }) {
    try {
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // })
      // return tokens ? tokens.publicKey : null
      console.log(userId)
      const filter = { user: userId },
        update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken },
        options = { upsert: true, new: true }

      const tokens = await keyTokenModel.findOneAndUpdate(filter, update, options)

      console.log(tokens, 1234)
      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }

  static async findByUserId(userId) {
    console.log(userId)
    return await keyTokenModel.findOne({ user: new Types.ObjectId(userId) }).lean()
  }

  static async removeKeyById(id) {
    return await keyTokenModel.deleteOne({ _id: new Types.ObjectId(id) }).lean()
  }
}

module.exports = KeyTokenService
