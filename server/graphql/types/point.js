const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
const GraphQLFloat = require('graphql').GraphQLFloat;

exports.PointType = new GraphQLObjectType({
    name: 'Point',
    fields: () => ({
      lat: { type: GraphQLFloat },
      lng: { type: GraphQLFloat }
    })
});

exports.PointInputType = new GraphQLInputObjectType({
    name: 'PointInput',
    fields: () => ({
      lat: { type: GraphQLFloat },
      lng: { type: GraphQLFloat }
    })
});