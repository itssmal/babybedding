const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        required: true
    },
    positions: [
        {
            position: {
                type: String
            },
            positionId: {
                type: String
            },
            cost: {
                type: Number
            },
            saleCost: {
                type: Number
            },
            quantity: {
                type: Number
            },
        }
    ],
    userName: {
        type: String,
        required: true
    },
    userPhoneNumber: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    },
    done: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('order', orderSchema)
