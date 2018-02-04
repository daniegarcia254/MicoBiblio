const RegisterModel = require('../../../models/register');
const RegisterType = require('../../types/register').RegisterType;
const RegisterInputType = require('../../types/register').RegisterInputType;
const GoogleMapsAPI = require('../../../utils/googleMapsAPI').GoogleMapsAPI;

const isEmpty = function(obj) {
  return (Object.keys(obj).length === 0 && obj.constructor === Object);
}

const saveModel = function(register){
  const rModel = new RegisterModel(register);
  return rModel.save()
    .then((response) => response)
    .catch(err => new Error(err));
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
        return GoogleMapsAPI.getLocation(register)
          .then((response) => {
            return saveModel(response);
          });
      } else if (register.location.point && !register.location.address) {
        return GoogleMapsAPI.getAddress(register)
          .then((response) => {
            return saveModel(response);
          });
      } else {
        return saveModel(register);
      }
    } else {
      return saveModel(register);
    }
  }
}