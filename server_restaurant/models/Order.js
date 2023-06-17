const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    status: {
        type: String,
        default: "dadat",
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    order_at: {
        type: Date,
        required: true,
        // default: Date()
    },
    bill_at: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    note: {
        type: String,
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    },
})

module.exports = mongoose.model('Order', OrderSchema);