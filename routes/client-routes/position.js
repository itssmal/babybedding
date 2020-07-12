const express = require('express')
const controller = require('../../controllers/admin-controllers/position')
const router = express.Router()

router.get('/:categoryId', controller.getByCategoryId)

module.exports = router
