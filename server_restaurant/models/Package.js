const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
    pack_name: {
        type: String,
        required: true,
    },
    pack_rest_num: {
        type: Number,
        required: true,
    },
    pack_cost: {
        type: Number,
        required: true,
    },
    pack_time_lomit: {
        type: Number,
        required: true,
    }
});
module.exports = mongoose.model("Package", PackageSchema);