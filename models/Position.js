const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            imageSrc: {
                type: String
            }
        }
    ],
    mainImageId: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    saleCost: {
        type: Number,
        required: false
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('positions', positionSchema)
