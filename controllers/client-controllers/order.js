const Order = require('../../models/Order')
const errorhandler = require('../../utils/errorhandler')

module.exports.create = async function (req, res) {
    try {
        const lastOrder = await Order.findOne().sort({date: -1})
        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            order: maxOrder + 1,
            positions: req.body.positions,
            userName: req.body.userName,
            userPhoneNumber: req.body.userPhoneNumber,
            userEmail: req.body.userEmail,
            area: req.body.area,
            city: req.body.city,
            department: req.body.department,
            notes: req.body.notes,
            done: false
        }).save()
        res.status(200).json('Замовлення створено!')
    } catch (e) {
        errorhandler(res, e)
    }
}


