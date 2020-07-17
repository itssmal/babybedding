const express = require('express')
const controller = require('../../controllers/client-controllers/position')
const router = express.Router()

router.get('/from-cat/:categoryId', controller.getByCategoryId)
router.get('/:id', controller.getById)

module.exports = router
