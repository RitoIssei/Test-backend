const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkAuth')

router.post('/user/signup', asyncHandler(accessController.signUp))
router.post('/user/login', asyncHandler(accessController.login))

module.exports = router
