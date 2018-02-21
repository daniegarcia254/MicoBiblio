const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mushroomSchema = new Schema({
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
const Model = mongoose.model('Mushroom', mushroomSchema);
module.exports = Model;