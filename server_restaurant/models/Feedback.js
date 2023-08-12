const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    content: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);