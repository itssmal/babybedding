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

module.exports.create = async function (req, res) {
    const mainData = new MainData({
        textLeft: req.body.textLeft,
        textRight: req.body.textRight,
        mainImageSrc: req.file ? req.file.path : 'uploads/71702674_173937917082870_6877088310849204208_n.png',
        leftImageSrc: req.file ? req.file.path : 'uploads/71702674_173937917082870_6877088310849204208_n.png',
        rightImageSrc: req.file ? req.file.path : 'uploads/71702674_173937917082870_6877088310849204208_n.png'
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

    if (req.files) {
        if (req.files.mainImageSrc) {
            updated.mainImageSrc = req.files.mainImageSrc[0].path
        }
        if (req.files.leftImageSrc) {
            updated.leftImageSrc = req.files.leftImageSrc[0].path
        }
        if (req.files.rightImageSrc) {
            updated.rightImageSrc = req.files.rightImageSrc[0].path
        }
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
