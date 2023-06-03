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
        type: String,
        // required: true,
        // default: Date(),
    },
    bill_at: {
        type: Date,
        // required: true,
        default: Date(),
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    table: {
        type: Schema.Types.ObjectId,
        ref: 'Table',
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
    },
})

module.exports = mongoose.model('Order', OrderSchema);