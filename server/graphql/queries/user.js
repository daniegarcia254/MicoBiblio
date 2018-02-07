const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const UserModel = require('../../models/user');
const UserType = require('../types/user').UserType;
const Auth = require('../../utils/auth').Auth;

// Query
exports.queries = {
    userInfo: {
        type: UserType,
        resolve: function (parent, args, ctx) {
            return Auth.getAuthenticatedUser(ctx)
            .then((user) => {
                user.password = '';
                return user;
            })
            .catch(err => new Error(err));
        }
    }
};