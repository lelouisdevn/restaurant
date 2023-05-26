const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
  tbl_id: {
    type: String,
    required: true,
  },
  tbl_seat_num: {
    type: Number,
    required: true,
  },
  tbl_status: {
    type: Number,
    required: true,
    default: 0,
  },
  lobby: {
    type: Schema.Types.ObjectId,
    ref: "Lobby",
  },
});
module.exports = mongoose.model("Table", TableSchema);
