const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
var Model = mongoose.model('User', userSchema);
module.exports = Model;