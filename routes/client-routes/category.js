const express = require('express')
const controller = require('../../controllers/client-controllers/category')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/name/:id', controller.getCategoryName)

module.exports = router
