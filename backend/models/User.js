const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const userSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
});

module.exports = mongoose.model('user',userSchema);