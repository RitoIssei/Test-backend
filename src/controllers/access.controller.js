const { CREATED, SuccessResponse } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
  async handlerRefreshToken(req, res, next) {
    new SuccessResponse({
      metadata: await AccessService.handlerRefreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore
      })
    }).send(res)
    // return res.status(201).json(await AccessService.signUp(req.body))
  }

  async logout(req, res, next) {
    new SuccessResponse({
      metadata: await AccessService.logout(req.keyStore)
    }).send(res)
    // return res.status(201).json(await AccessService.signUp(req.body))
  }

  async login(req, res, next) {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res)
    // return res.status(201).json(await AccessService.signUp(req.body))
  }

  async signUp(req, res, next) {
    new CREATED({
      message: 'Regiserted OK!',
      metadata: await AccessService.signUp(req.body)
    }).send(res)
    // return res.status(201).json(await AccessService.signUp(req.body))
  }
}

module.exports = new AccessController()
