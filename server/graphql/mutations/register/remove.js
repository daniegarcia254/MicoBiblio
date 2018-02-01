const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const RegisterModel = require('../../../models/register');
const registerType = require('../../types/register').registerType;

exports.remove = {
  type: registerType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removedregister = RegisterModel.findByIdAndRemove(params.id).exec();
    if (!removedregister) {
      throw new Error('Error')
    }
    return removedregister;
  }
}
