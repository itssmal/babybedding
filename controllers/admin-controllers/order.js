const Order = require('../../models/Order')
const errorHandler = require('../../utils/errorhandler')


module.exports.getAll = async function (req, res) {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        done: req.body.done
    }
    console.log(req)
    try {
       const order = await Order.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function (req, res) {
    try {
        await Order.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Замовлення видалено!'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}


