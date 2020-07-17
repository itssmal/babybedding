const Category = require('../../models/Category')
const errorHandler = require('../../utils/errorhandler')

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (e) {
        errorHandler(res, e)
    }
}


