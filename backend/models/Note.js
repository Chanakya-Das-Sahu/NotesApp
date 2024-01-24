const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const noteSchema = new Schema({
    userID: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    }
});

module.exports = mongoose.model('note',noteSchema);