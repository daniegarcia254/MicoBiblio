const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
const GraphQLString = require('graphql').GraphQLString;
const PointType = require('./point').PointType;
const PointInputType = require('./point').PointInputType;

exports.LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: () => ({
      address: { type: GraphQLString },
      point: { type: PointType }
    })
});

exports.LocationInputType = new GraphQLInputObjectType({
    name: 'LocationInput',
    fields: () => ({
      address: { type: GraphQLString },
      point: { type: PointInputType }
    })
});