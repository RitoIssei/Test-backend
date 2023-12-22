const { findById } = require('../services/apikey.service')

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}

async function apiKey(rep, res, next) {
  try {
    const key = rep.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden'
      })
    }
    const objKey = await findById(key)
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden'
      })
    }
    rep.objKey = objKey
    return next()
  } catch (error) {}
}

function permission(permission) {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'Permission'
      })
    }

    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission) {
      return res.status(403).json({
        message: 'Permission'
      })
    }

    return next()
  }
}

module.exports = { apiKey, permission }
