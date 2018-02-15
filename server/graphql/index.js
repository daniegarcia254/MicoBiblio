const GraphQLSchema = require('graphql').GraphQLSchema;
const GraphQLObjectType = require('graphql').GraphQLObjectType;
const queries = require('./queries/index').queries;
const mutations = require('./mutations/index').mutations;

const composeQueries = function(qs) {
  var queriesComposed = {};
  for (var typeKey in qs) {
      var q = qs[typeKey];
      for (var qType in q) {
        queriesComposed[qType] = {
          type: q[qType].type,
          args: q[qType].args,
          resolve: q[qType].resolve
        }
      }
  }
  return queriesComposed;
}

exports.appSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => (composeQueries(queries))
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => (mutations)
  })
});