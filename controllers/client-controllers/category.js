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

module.exports.getCategoryName = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category.name)
    } catch (e) {
        errorHandler(res, e)
    }
}

