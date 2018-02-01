const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mushroomSchema = new Schema({
    name: {
        latin: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        alt: {
            type: [String],
            index: true
        }
    },
    quality: {
        type: String,
        required: true
    }
});
var Model = mongoose.model('Mushroom', mushroomSchema);
module.exports = Model;