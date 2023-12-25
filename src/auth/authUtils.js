const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError } = require('../core/error.response')
const { findByUserId } = require('../services/keyToken.service')

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
  const accessToken = await JWT.sign(payload, publicKey, {
    expiresIn: '2 day'
  })

  const refreshToken = await JWT.sign(payload, privateKey, {
    expiresIn: '7 day'
  })
  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) {
      console.error('error verify::', err)
    } else {
      console.log('decode verify::', decode)
    }
  })
  return { accessToken, refreshToken }
}

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID]

  if (!userId) throw new AuthFailureError('Invalid Request')
  const keyStore = await findByUserId(userId)

  if (!keyStore) throw new NotFoundError('Not found keyStore')
  const accessToken = req.headers[HEADER.AUTHORIZATION]
  if (!accessToken) throw new AuthFailureError('Invalid Request')
  try {
    JWT.verify(accessToken, keyStore.publicKey, (err, decode) => {
      if (err) {
        console.error('error verify::', err)
      } else {
        console.log('decode verify::', decode)
        const decodeUser = decode
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid Userid')
      }
    })
    req.keyStore = keyStore
    return next()
  } catch (error) {
    throw error
  }
})

module.exports = {
  createTokenPair,
  authentication
}
