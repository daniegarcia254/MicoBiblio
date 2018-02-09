const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Register must belongs to an user']},
  date: { 
    type: Date, required: [true, 'Register date is required']
  },
  location: { 
    address: {
      type: String, required: [true, 'Location address is required']
    },
    point: {
      lat: { type: Number, required: [true, 'Location latitude point is required'] },
      lng: { type: Number, required: [true, 'Location longitude point is required'] }
    }
  },
  description: { type: String },
  elevation: {
    type: Number, required: [true, 'Elevation data is required']
  },
  orientation: {
    type: String, enum: ['Norte', 'Este', 'Sur', 'Oeste']
  },
  mushrooms: [
    { type: Schema.Types.ObjectId, ref: 'Mushroom' }
  ],
  trees: { 
    type: [{ type: String, enum: ['Pino', 'Haya', 'Encina', 'Roble'] } ], 
    required: [true, 'At least one type of tree must be selected']
  },
  images: { type: [ { type: String } ]}
});
registerSchema.pre('find', function() {
  this.populate({ path: 'user', select: '-password'}).populate('mushrooms');
});
const Model = mongoose.model('Register', registerSchema);
module.exports = Model;