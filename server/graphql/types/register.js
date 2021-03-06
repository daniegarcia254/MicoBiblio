const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
const GraphQLNonNull = require('graphql').GraphQLNonNull;
const GraphQLID = require('graphql').GraphQLID;
const GraphQLString = require('graphql').GraphQLString;
const GraphQLFloat = require('graphql').GraphQLFloat;
const GraphQLList = require('graphql').GraphQLList;
const OrientationType = require('./orientation').OrientationType;
const LocationType = require('./location').LocationType;
const LocationInputType = require('./location').LocationInputType;
const TreeType = require('./tree').TreeType;

// User Type
exports.RegisterType = new GraphQLObjectType({
  name: 'Register',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    user: { type: new GraphQLNonNull(GraphQLID) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(LocationType) },
    elevation: { type: new GraphQLNonNull(GraphQLFloat) },
    orientation: { type: OrientationType },
    trees: { type: new GraphQLList(TreeType) },
    mushrooms: { type: new GraphQLList(GraphQLID) },
    description: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) }
  })
});

exports.RegisterInputType = new GraphQLInputObjectType({
  name: 'RegisterInput',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLID },
    date: { type: GraphQLString },
    location: { type: LocationInputType },
    elevation: { type: GraphQLFloat },
    orientation: { type: OrientationType },
    trees: { type: new GraphQLList(TreeType) },
    mushrooms: { type: new GraphQLList(GraphQLID) },
    description: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) }
  })
});

const ElevationRange = new GraphQLInputObjectType({
  name: 'ElevationRange',
  fields: () => ({
    min: { type: GraphQLFloat },
    max: { type: GraphQLFloat }
  })
});

exports.RegisterFilterType = new GraphQLInputObjectType({
  name: 'RegisterFilterType',
  fields: {
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    elevation: { type: ElevationRange },
    orientation: { type: OrientationType },
    address: { type: GraphQLString },
    point: { type: new GraphQLList(GraphQLFloat) },
    trees: { type: new GraphQLList(TreeType) },
    mushrooms: { type: new GraphQLList(GraphQLID) },
    free: { type: GraphQLString },
  }
});