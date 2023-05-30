const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    prod_name: {
        type: String,
        required: true,
    },
    prod_img: {
        type: String,
        required: true,
    },
    prod_desc: {
        type: String,
        required: true,
    },
    prod_unit: {
        type: String,
        required: true,
    },
    prod_price: {
        type: Number,
        default: 0,
        required: true,
    },
    prod_status: {
        type: Boolean,
        default: true,
        // required: true,
    },
    // restaurant: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Restaurant'
    // },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

module.exports = mongoose.model("Product", ProductSchema);