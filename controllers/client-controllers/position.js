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

