const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    rest_name: {
        type: String,
        required: true,
    },
    rest_desc: {
        type: String,
        required: true,
    },
    rest_addr: {
        type: String,
        required: true,
    },
    rest_phone: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("Info", InfoSchema);