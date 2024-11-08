const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promo = new Schema({
    imagePromo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Promo', promo);