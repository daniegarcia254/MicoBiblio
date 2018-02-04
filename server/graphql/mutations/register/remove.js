const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const RegisterModel = require('../../../models/register');
const RegisterType = require('../../types/register').RegisterType;

exports.remove = {
  type: RegisterType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params) {
    return RegisterModel.findByIdAndRemove(params.id)
      .then((response) => {
          if (!response) {
            throw new Error('Can\'t find register with ID '+params.id+' to be removed.');  
          }
          return response;
      })
      .catch((error) => {
          throw error;
      });
  }
}
