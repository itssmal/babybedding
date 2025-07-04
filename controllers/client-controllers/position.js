const Position = require('../../models/Position')
const errorHandler = require('../../utils/errorhandler')

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
        })
        positions.sort((a, b) => {
            if (a.saleCost && !b.saleCost) {
                return -1
            } else if(!a.saleCost && b.saleCost) {
                return 1
            } else return 0
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const position = await Position.findById(req.params.id)
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.getBulkByIds = async function (req, res) {
    try {
        console.log('req.query', req.query.id)
        const positions = await Position.find().where('_id').in(req.query.id).exec();
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res,e)
    }
}
