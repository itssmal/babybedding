const MainData = require('../../models/MainData')
const errorHandler = require('../../utils/errorhandler')


module.exports.get = async function (req, res) {
    try {
        const mainData = await MainData.find()
        res.status(200).json(mainData)
    } catch (e) {
        errorHandler(res, e)
    }
}

