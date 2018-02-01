const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLFloat = require('graphql').GraphQLFloat;
const GraphQLList = require('graphql').GraphQLList;
const orientationType = require('./orientation').orientationType;
const locationType = require('./location').locationType;
const treeType = require('./tree').treeType;

// User Type
exports.registerType = new GraphQLObjectType({
  name: 'register',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    date: { type: GraphQLString },
    location: { type: locationType },
    elevation: { type: GraphQLFloat },
    orientation: { type: orientationType },
    trees: { type: new GraphQLList(treeType) },
    mushrooms: { type: new GraphQLList(GraphQLID) },
    description: { type: GraphQLString }
  })
});