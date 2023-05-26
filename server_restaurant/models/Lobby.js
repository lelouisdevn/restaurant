const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LobbySchema = new Schema({
    lob_name: {
        type: String,
        required: true,
    },
    lob_tbl_num: {
        type: Number,
        required: true,
    },
    lob_status: {
        type: Number,
        required: true,
        default: 1,
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
});
module.exports = mongoose.model("Lobby", LobbySchema);