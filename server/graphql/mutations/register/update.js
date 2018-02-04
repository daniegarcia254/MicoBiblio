const GraphQLNonNull = require('graphql').GraphQLNonNull;
const RegisterModel = require('../../../models/register');
const RegisterType = require('../../types/register').RegisterType;
const RegisterInputType = require('../../types/register').RegisterInputType;
const GoogleMapsAPI = require('../../../utils/googleMapsAPI').GoogleMapsAPI;

const isEmpty = function(obj) {
  return (Object.keys(obj).length === 0 && obj.constructor === Object);
}

const updateModel = function(register){
  return RegisterModel.findByIdAndUpdate(
    register.id,
    register,
    { new: true }
  )
  .then((response) => response)
  .catch(err => new Error(err));
}

exports.update = {
  type: RegisterType,
  args: {
    register: {
      type: new GraphQLNonNull(RegisterInputType)
    }
  },
  resolve(root, params) {
    var register = params.register;
    if (register && register.location) {
      if (register.location.address && (!register.location.point || isEmpty(register.location.point))) {
        // Get point from address
        return GoogleMapsAPI.getLocation(register)
          .then((response) => {
            return updateModel(response);
          });
      } else if (register.location.point && !register.location.address) {
        // Get address from point
        return GoogleMapsAPI.getAddress(register)
          .then((response) => {
            return updateModel(response);
          });
      } else {
        return updateModel(register);
      }
    } else {
      return updateModel(register);
    }
  }
}