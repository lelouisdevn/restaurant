const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPackDetailSchema = new Schema({
  User: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  Package: {
    type: Schema.Types.ObjectId,
    ref: "Package"
  },
  time_start: {
    type: Date,
    required: true,
  },
  time_finish: {
    type: Date,
    required: true,
  }
});
module.exports = mongoose.model("UserPackDetail", UserPackDetailSchema);