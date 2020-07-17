const express = require('express')
const controller = require('../../controllers/client-controllers/edit')
const router = express.Router()

router.get('/', controller.get)

module.exports = router
