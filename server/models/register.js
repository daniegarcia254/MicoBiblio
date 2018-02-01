const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  date: { type: Date, required: true },
  location: { 
    address: { type: String, required: true },
    point: { lat: { type: Number, required: true }, lng: { type: Number, required: true} }
  },
  elevation: { type: Number, required: true },
  orientation: { type: String, enum: ['Norte', 'Este', 'Oeste', 'Sur'] },
  mushrooms: [{ type: Schema.Types.ObjectId, ref: 'Mushroom' }],
  trees: { 
    type: [{ type: String, enum: ['Pinos', 'Hayas', 'Encinas', 'Robles'] } ], 
    required: true
  },
  description: { type: String }
});
const Model = mongoose.model('Register', registerSchema);
module.exports = Model;