const userModel = require('../models/user.model')
const crypto = require('crypto')
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
            type: 'spki',
            format: 'pem'
          },
          privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem'
          }
        })
        console.log(privateKey, publicKey)
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
