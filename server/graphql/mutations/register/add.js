const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config')[env];
const googleMapsClient = require('@google/maps').createClient({
  key: config.GoogleApiKey,
  Promise: Promise
});

const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const RegisterModel = require('../../../models/register');
const RegisterType = require('../../types/register').RegisterType;
const RegisterInputType = require('../../types/register').RegisterInputType;

const isEmpty = function(obj) {
  return (Object.keys(obj).length === 0 && obj.constructor === Object);
}

const saveModel = function(register){
  const rModel = new RegisterModel(register);
  const newRegister = rModel.save();
  if (!newRegister) {
    throw new Error('Error creating register!');
  }
  return newRegister;
}

exports.add = {
  type: RegisterType,
  args: {
    register: {
      type: RegisterInputType
    }
  },
  resolve(root, params) {
    var register = params.register;
    if (register && register.location) {
      if (register.location.address && (!register.location.point || isEmpty(register.location.point))) {
        // Get point from address
        return googleMapsClient.geocode({
          address: register.location.address,
          language: 'es'
        }).asPromise().then((response) => {
          register.location.point = response.json.results[0].geometry.location;
          return saveModel(register);
        }).catch((err) => {
          throw err;
        });
      } else if (register.location.point && !register.location.address) {
        // Get address from point
        return googleMapsClient.reverseGeocode({
          latlng: [register.location.point.lat, register.location.point.lng],
          language: 'es'
        }).asPromise().then((response) => {
          register.location.address = response.json.results[0].formatted_address;
          console.log("Case 2.1");
          return saveModel(register);
        }).catch((err) => {
          throw err;
        });
      } else {
        return saveModel(register);
      }
    } else {
      return saveModel(register);
    }
  }
}