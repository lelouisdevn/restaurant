const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    staff_name: {
        type: String,
        required: true,
    },
    staff_dob: {
        type: String,
        required: true,
    },
    staff_phone: {
        type: String,
        required: true,
    },
    staff_addr: {
        type: String,
        required: true,
    },
    staff_gender: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    staff_status: {
        type: Number,
        required: true,
        default: 1,
    },
    staff_avt:{
        type: String,
    }
});
module.exports = mongoose.model("User", UserSchema);