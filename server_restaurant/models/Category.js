const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    category_name: {
        type: String,
        require: true,
    },
    category_img: {
        type: String,
        required: true,
        default: "https://static.vecteezy.com/system/resources/previews/005/988/954/original/hidden-icon-free-vector.jpg",
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
})

module.exports = mongoose.model('Category', CategorySchema);