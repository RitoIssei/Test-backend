const userModel = require('../models/user.model')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const RoleUser = {
  USER: 'USER',
  WRITER: 'WRITER',
  ADMIN: 'ADMIN'
}
class AccessService {
  static async signUp({ name, email, password }) {
    console.log(password)
    try {
      const hodelUser = await userModel.findOne({ email }).lean()

      if (hodelUser) {
        return {
          code: 'xxx',
          message: 'User already reggistered'
        }
      }

      const hastPassword = await hashPassword(password)
      const newUser = await userModel.create({
        name,
        email,
        password: hastPassword,
        roles: [RoleUser.USER]
      })

      if (newUser) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
          }
        })
        console.log(privateKey, publicKey)

        const publicKeyString = await KeyTokenService.createKeyToken(newUser._id, publicKey)

        if (!publicKeyString) {
          return {
            code: 'xxx',
            message: 'publicKeyString error'
          }
        }
        const token = await createTokenPair(
          { userId: newUser._id, email },
          crypto.createPublicKey(publicKeyString),
          privateKey
        )
        console.log('Created Token Success::', token)

        return {
          code: 200,
          metadata: {
            user: newUser,
            token
          }
        }
      }
      return {
        code: 200,
        metadata: null
      }
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error'
      }
    }
  }
}

function hashPassword(password) {
  const hash = crypto.createHash('sha256')
  hash.update(password)
  const hashedPassword = hash.digest('hex')
  return hashedPassword
}

module.exports = AccessService
