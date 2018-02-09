const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const RegisterModel = require('../../models/register');
const MushroomModel = require('../../models/mushroom');
const RegisterType = require('../types/register').RegisterType;
const Auth = require('../../utils/auth').Auth;

// Query
exports.queries = {
  userRegisters: {
    type: new GraphQLList(RegisterType),
    resolve: function (parent, args, ctx) {
      return Auth.getAuthenticatedUser(ctx)
        .then((user) => {
          return RegisterModel.find({ user: user.id}).
                  populate({ path: 'user', select: '-password'}).
                  populate('mushrooms').exec();
        })
        .catch(err => new Error(err));
    }
  },
  searchRegisters: {
    type: new GraphQLList(RegisterType),
    resolve: function (parent, args, ctx) {
      return Auth.getAuthenticatedUser(ctx)
        .then((user) => {
          return RegisterModel.find({ user: user.id}).
                  populate({ path: 'user', select: '-password'}).
                  populate('mushrooms').exec();
        })
        .catch(err => new Error(err));
    }
  }
};