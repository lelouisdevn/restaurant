const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
    Order: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Order",
    },
    Product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    qty: {
        type: Number,
        required: true,
    },
    unit_price: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model("OrderDetail", OrderDetailSchema);