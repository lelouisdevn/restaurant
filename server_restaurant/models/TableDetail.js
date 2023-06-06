const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TableDetailSchema = new Schema({
  table: {
    type: Schema.Types.ObjectId,
    ref: "Table"
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  status: {
    type: Number,
    required: true,
    default: 1
  }
});
module.exports = mongoose.model("TableDetail", TableDetailSchema);
