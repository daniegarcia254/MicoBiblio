const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const RegisterModel = require('../../models/register');
const RegisterType = require('../types/register').RegisterType;
const Auth = require('../../utils/auth').Auth;

// Query
exports.queries = {
  registers: {
    type: new GraphQLList(RegisterType),
    resolve: function (parent, args, ctx) {
      return Auth.getAuthenticatedUser(ctx)
        .then((user) => {
          const registers = RegisterModel.find({ user: user.id}).exec()
          if (!registers) {
            throw new Error('Error')
          }
          return registers;
        })
        .catch(err => new Error(err));
    }
  }
};