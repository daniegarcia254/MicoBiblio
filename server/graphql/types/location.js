const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;
const pointType = require('./point').pointType;

exports.locationType = new GraphQLObjectType({
    name: 'location',
    fields: () => ({
      address: { type: GraphQLString },
      point: { type: pointType }
    })
});