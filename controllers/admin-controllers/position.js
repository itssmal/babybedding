const Position = require('../../models/Position')
const errorHandler = require('../../utils/errorhandler')

module.exports.getAll = async function (req, res) {
    try {
        const positions = await Position.find()
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
        })
        res.status(200).json(positions)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getOneById = async function (req, res) {
    try {
        const position = await Position.findById(req.params.id)
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const position = await new Position({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            category: req.body.categoryId,
            images: [
                {
                    imageSrc: String
                }
            ],
            mainImageId: req.body.mainImageId

        })
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                position.images.push({imageSrc: req.files[i].path})
            }
            position.images.shift()
        }
        position.save()
        res.status(201).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Position.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Позиція видалена'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {

    const updated = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        category: req.body.categoryId,
        images: [
            {
                imageSrc: String
            }
        ],
        mainImageId: req.body.mainImageId
    }
    if (req.files) {
        console.log(req.files)
        for (let i = 0; i < req.files.length; i++) {
            updated.images.push({imageSrc: req.files[i].path})
        }
        updated.images.shift()
    }
    if (req.body.images) {
        console.log(JSON.parse(req.body.images))
        updated.images = JSON.parse(req.body.images)
    }
    try {

        const position = await Position.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(position)
    } catch (e) {
        errorHandler(res, e)
    }
}
