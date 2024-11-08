const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menu = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Menu', menu);