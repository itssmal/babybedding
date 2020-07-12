const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    order: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    positionId: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    cost: {
        type: Number
    },
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
    address: {
        type: String,
        required: true
    },
    mailNum: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('order', orderSchema)
