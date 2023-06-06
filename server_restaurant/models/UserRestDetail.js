const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserRestDetailSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    info: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Info'
    }
});
module.exports = mongoose.model("UserRestDetail", UserRestDetailSchema);