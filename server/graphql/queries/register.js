const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLList = require('graphql').GraphQLList;
const RegisterModel = require('../../models/register');
const RegisterType = require('../types/register').RegisterType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    registers: {
      type: new GraphQLList(RegisterType),
      resolve: function () {
        const registers = RegisterModel.find().exec()
        if (!registers) {
          throw new Error('Error')
        }
        return registers
      }
    }
  })
});