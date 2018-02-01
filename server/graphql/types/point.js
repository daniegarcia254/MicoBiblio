const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLFloat = require('graphql').GraphQLFloat;

exports.pointType = new GraphQLObjectType({
    name: 'point',
    fields: () => ({
      lat: { type: GraphQLFloat },
      lng: { type: GraphQLFloat }
    })
});