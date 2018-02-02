const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const RegisterModel = require('../../../models/register');
const RegisterType = require('../../types/register').RegisterType;
const RegisterInputType = require('../../types/register').RegisterInputType;

exports.add = {
  type: RegisterType,
  args: {
    register: {
      type: RegisterInputType
    }
  },
  resolve(root, params) {
    console.log("rmodel", params.register);
    const rModel = new RegisterModel(params.register);
    console.log("rmodel", rModel);
    const newRegister = rModel.save();
    if (!newRegister) {
      throw new Error('Error');
    }
    return newRegister
  }
}