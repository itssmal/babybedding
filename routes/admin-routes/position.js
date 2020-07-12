const express = require('express')
const passport = require('passport')
const upload = require('../../middleware/upload')
const controller = require('../../controllers/admin-controllers/position')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll )
router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId)
router.get('/edit/:id', passport.authenticate('jwt', {session: false}), controller.getOneById)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)

module.exports = router
