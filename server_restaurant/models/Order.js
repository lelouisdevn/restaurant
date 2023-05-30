const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    status: {
        type: String,
        default: "dadat",
        // required: true,
    },
    total: {
        type: Number,
        default: 0,
        // required: true,
    },
    order_at: {
        type: Date,
        // required: true,
        default: Date(),
    },
    bill_at: {
        type: Date,
        // required: true,
        default: Date(),
    }
})

module.exports = mongoose.model('Order', OrderSchema);