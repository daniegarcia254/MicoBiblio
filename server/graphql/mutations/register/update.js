const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLString = require('graphql').GraphQLString;
const RegisterModel = require('../../../models/register');
const RegisterType = require('../../types/register').RegisterType;
const RegisterInputType = require('../../types/register').RegisterInputType;

exports.update = {
  type: RegisterType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return RegisterModel.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name } },
      { new: true }
    )
    .catch(err => new Error(err));
  }
}