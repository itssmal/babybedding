const Order = require('../../models/Order')
const errorhandler = require('../../utils/errorhandler')

module.exports.getAll = async function (req, res) {
    try {
        const orders = await Order.find().sort({date: -1})
        res.status(200).json(orders)
    } catch (e) {
        errorhandler(res, e)
    }
}
module.exports.create = async function (req, res) {
    try {
        const lastOrder = await Order.findOne().sort({date: -1})
        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            date: req.body.date,
            order: maxOrder + 1,
            position: req.body.position,
            positionId: req.body.positionId,
            price: req.body.price,
            quantity: req.body.quantity,
            cost: req.body.cost,
            userName: req.body.userName,
            userPhoneNumber: req.body.userPhoneNumber,
            userEmail: req.body.userEmail,
            address: req.body.address,
            mailNum: req.body.mailNum,
            done: false
        })
        res.status(200).json(order)
    } catch (e) {
        errorhandler(res, e)
    }
}


