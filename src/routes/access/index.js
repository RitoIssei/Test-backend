const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')

router.post('/user/signup', asyncHandler(accessController.signUp))
router.post('/user/login', asyncHandler(accessController.login))
router.use(authentication)
router.post('/user/logout', asyncHandler(accessController.logout))
router.post('/user/refresh-token', asyncHandler(accessController.handlerRefreshToken))

module.exports = router
