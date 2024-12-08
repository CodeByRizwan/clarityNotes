const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    }

});


const book = model('Book', bookSchema);
module.exports = book;
