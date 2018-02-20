const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLFloat = require('graphql').GraphQLFloat;

exports.LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
      address: { type: GraphQLString },
      point: { type: new GraphQLList(GraphQLFloat) }
    })
});

exports.LocationInputType = new GraphQLInputObjectType({
    name: 'LocationInput',
    fields: () => ({
      address: { type: GraphQLString },
      point: { type: new GraphQLList(GraphQLFloat) }
    })
});