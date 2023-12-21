const userModel = require('../models/user.model')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { BadRequestError, AuthFailureError } = require('../core/error.response')
const { getInforData } = require('../utils')
const { findByEmail } = require('./user.service')
const bcrypt = require('bcrypt')

const RoleUser = {
  USER: 'USER',
  WRITER: 'WRITER',
  ADMIN: 'ADMIN'
}
class AccessService {
  static async login({ email, password, refreshToken = null }) {
    console.log(password)
    const foundUser = await findByEmail({ email })
    console.log(foundUser)

    if (!foundUser) throw new BadRequestError('User not registered')
    console.log(password, foundUser.password)
    const match = bcrypt.compare(password, foundUser.password)
    if (!match) throw new AuthFailureError('Password not match')

    const publicKey = crypto.randomBytes(64).toString('hex')
    const privateKey = crypto.randomBytes(64).toString('hex')

    const tokens = await createTokenPair({ userId: foundUser._id, email }, publicKey, privateKey)

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      privateKey,
      publicKey
    })
    return {
      user: getInforData(['_id', 'name', 'email'], foundUser),
      tokens
    }
  }

  static async signUp({ name, email, password }) {
    const hodelUser = await userModel.findOne({ email }).lean()
    if (hodelUser) {
      throw new BadRequestError('Error: Shop already registered')
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword,
      roles: [RoleUser.USER]
    })

    if (newUser) {
      // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      //   modulusLength: 2048,
      //   publicKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem'
      //   },
      //   privateKeyEncoding: {
      //     type: 'pkcs1',
      //     format: 'pem'
      //   }
      // })

      const publicKey = crypto.randomBytes(64).toString('hex')
      const privateKey = crypto.randomBytes(64).toString('hex')

      const keyStore = await KeyTokenService.createKeyToken(newUser._id, publicKey, privateKey)

      if (!keyStore) {
        throw new BadRequestError('Error: PublicKeyString error')
      }
      const tokens = await createTokenPair({ userId: newUser._id, email }, publicKey, privateKey)
      console.log('Created Token Success::', tokens)

      return {
        user: getInforData(['_id', 'name', 'email'], newUser),
        tokens
      }
    }
    return null
  }
}

module.exports = AccessService
