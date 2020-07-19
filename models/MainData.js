const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mainDataSchema = new Schema({
    textLeft: {
        type: String,
        default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab, accusamus asperiores autem ducimus earum excepturi exercitationem nesciunt pariatur quo repellendus sint sit tempora! Ad deleniti est magnam sed sequi.'
    },
   textRight: {
        type: String,
        default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab, accusamus asperiores autem ducimus earum excepturi exercitationem nesciunt pariatur quo repellendus sint sit tempora! Ad deleniti est magnam sed sequi.'
    },
    mainImageSrc: {
        type: String,
        default: '',
    },
    leftImageSrc: {
        type: String,
        default: ''
    },
    rightImageSrc: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('mainData', mainDataSchema)
