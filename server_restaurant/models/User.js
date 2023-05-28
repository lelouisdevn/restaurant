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
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    role: {
        type: String,
        required: true,
    },
    staff_status: {
        type: Number,
        required: true,
        default: 1,
    }
});
module.exports = mongoose.model("User", UserSchema);