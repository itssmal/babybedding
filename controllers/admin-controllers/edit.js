const MainData = require('../../models/MainData')
const errorHandler = require('../../utils/errorhandler')

module.exports.get = async function (req, res) {
    try {
        const mainData = await MainData.findById('5f0b3d6edef583e87542b873')
        res.status(200).json(mainData)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const mainData = new MainData({
        textLeft: req.body.textLeft,
        textRight: req.body.textRight,
        mainImageSrc: req.file ? req.file.path : 'uploads/71702674_173937917082870_6877088310849204208_n.png'
    })

    try {
        await mainData.save()
        res.status(201).json(mainData)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    const updated = {
        textLeft: req.body.textLeft,
        textRight: req.body.textRight,
    }

    if (req.file) {
        updated.mainImageSrc = req.file.path
    }

    try {
        const mainData = await MainData.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(mainData)
    } catch (e) {
        errorHandler(res, e)
    }
}
