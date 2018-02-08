const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLBoolean = require('graphql').GraphQLBoolean;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const UserModel = require('../../../models/user');
const UserType = require('../../types/user').UserType;
const Auth = require('../../../utils/auth').Auth;
const bcrypt = require('bcrypt');

const updatePassword = function(user) {
    return UserModel.findByIdAndUpdate(
        user.id,
        user,
        { new: true }
    )
    .then((response) => {
        response.password = '';
        return response;
    })
    .catch(err => new Error(err));
}

exports.changePassword = {
    type: UserType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        oldPassword: { type: new GraphQLNonNull(GraphQLString) },
        newPassword: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(parent, params, ctx) {
        return Auth.getAuthenticatedUser(ctx)
            .then((user) => {
                if (user._id.equals(params.id)) {
                    return bcrypt.compare(params.oldPassword, user.password).then((res) => {
                        if (res) {
                            return bcrypt.hash(params.newPassword, 10)
                                .then((hash) => {
                                    user.password = hash;
                                    return user.save()
                                        .then((userUpdated) => {
                                            ctx.user = Promise.resolve(userUpdated);
                                            userUpdated.password = '';
                                            return userUpdated;
                                        })
                                        .catch(err => new Error(err));
                                });
                        }
                        return Promise.reject('Unauthorized: old password is incorrect');
                    });
                }
                return Promise.reject('Unauthorized: user can change its own password');
            });
    }
}