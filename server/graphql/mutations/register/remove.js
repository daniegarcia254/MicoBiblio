const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const RegisterModel = require('../../../models/register');
const RegisterType = require('../../types/register').RegisterType;
const Auth = require('../../../utils/auth').Auth;

exports.remove = {
  type: RegisterType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(parent, params, ctx) {
    return Auth.getAuthenticatedUser(ctx)
      .then((user) => {
        return Auth.checkBelongsToUser(user, params.id, RegisterModel, RegisterType.name, 'delete')
          .then((register) => {
            return RegisterModel.deleteOne({_id: register._id})
              .then(response => register )
              .catch(err => new Error(err));
          })
      })
  }
}
