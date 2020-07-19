const express = require('express')
const passport = require('passport')
const upload = require('../../middleware/upload')
const controller = require('../../controllers/admin-controllers/edit')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.get)
router.post('/', passport.authenticate('jwt', {session: false}), upload.fields([{name: 'mainImageSrc', maxCount: 1}, {name: 'leftImageSrc', maxCount: 1}, {name: 'rightImageSrc', maxCount: 1}]), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.fields([{name: 'mainImageSrc', maxCount: 1}, {name: 'leftImageSrc', maxCount: 1}, {name: 'rightImageSrc', maxCount: 1}]), controller.update)

module.exports = router
