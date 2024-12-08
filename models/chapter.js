const { Schema , model } = require('mongoose')

const chapterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: false
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    fields: {
        type : Map,
        of: [String],
        default: {}
    }
}) 

const chapter = model('Chapter',chapterSchema)
module.exports = chapter