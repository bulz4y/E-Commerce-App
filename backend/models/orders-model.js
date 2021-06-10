const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    total: {
        type: Number,
        required: true
    },

    items: [{type: Object, required: true}]
});

module.exports = mongoose.model('order', orderSchema);