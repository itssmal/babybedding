const express = require('express')
const controller = require('../../controllers/admin-controllers/category')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router
