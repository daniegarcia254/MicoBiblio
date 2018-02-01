const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const RegisterModel = require('../../../models/register');
const registerType = require('../../types/register').registerType;

exports.add = {
  type: registerType,
  args: {
    description: {
      type: GraphQLString
    }
  },
  resolve(root, params) {
    const rModel = new RegisterModel(params);
    const newRegister = rModel.save();
    if (!newRegister) {
      throw new Error('Error');
    }
    return newRegister
  }
}