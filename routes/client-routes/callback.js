const express = require('express')
const controller = require('../../controllers/client-controllers/callback')
const router = express.Router()

router.post('/', controller.requestCall)

module.exports = router
