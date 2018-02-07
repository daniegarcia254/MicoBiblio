const GraphQLNonNull = require('graphql').GraphQLNonNull;
const UserModel = require('../../../models/user');
const UserType = require('../../types/user').UserType;
const UserInputType = require('../../types/user').UserInputType;
const Auth = require('../../../utils/auth').Auth;

const updateModel = function(user){
    return UserModel.findByIdAndUpdate(
        user.id,
        user,
        { new: true }
    )
    .then((response) => response)
    .catch(err => new Error(err));
}

exports.update = {
    type: UserType,
    args: {
        user: {
            type: new GraphQLNonNull(UserInputType)
        }
    },
    resolve(parent, params, ctx) {
        return Auth.getAuthenticatedUser(ctx)
            .then((user) => {
                if (user._id.equals(params.user.id)) {
                    return updateModel(params.user);
                }
                return Promise.reject('Unauthorized: user can only update its own infor');
            });
    }
}