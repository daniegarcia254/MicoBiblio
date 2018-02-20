const GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
const GraphQLList = require('graphql').GraphQLList;
const GraphQLString = require('graphql').GraphQLString;
const RegisterModel = require('../../models/register');
const MushroomModel = require('../../models/mushroom');
const RegisterType = require('../types/register').RegisterType;
const RegisterFilterType = require('../types/register').RegisterFilterType;
const Auth = require('../../utils/auth').Auth;
const GoogleMapsAPI = require('../../utils/googleMapsAPI').GoogleMapsAPI;
const moment = require('moment');

// Query
exports.queries = {
  userRegisters: {
    type: new GraphQLList(RegisterType),
    resolve: function (parent, args, ctx) {
      return Auth.getAuthenticatedUser(ctx)
        .then((user) => {
          return RegisterModel.find({ user: user.id }).exec();
        })
        .catch(err => new Error(err));
    }
  },
  searchRegisters: {
    type: new GraphQLList(RegisterType),
    args: {
      filter: { type: RegisterFilterType },
    },
    resolve: function (parent, args, ctx) {
      return Auth.getAuthenticatedUser(ctx)
        .then((user) => {
          var filterInput = args.filter; 
          var filter = { user: user.id };
          if (filterInput.startDate) {
            filter['date'] = {
              "$gte": moment(filterInput.startDate).startOf('day').toDate().toISOString(),
              "$lt": moment(filterInput.startDate).endOf('day').toDate().toISOString()
            };
          }
          if (filterInput.endDate) {
            filter['date'] = {
              "$gte": moment(filterInput.startDate).startOf('day').toDate().toISOString(),
              "$lte": moment(filterInput.endDate).startOf('day').toDate().toISOString()
            };
          }
          if (filterInput.elevation && filterInput.elevation.max && filterInput.elevation.min) {
            filter['elevation'] = {
              "$gte": parseFloat(filterInput.elevation.min),
              "$lte": parseFloat(filterInput.elevation.max)
            };
          }
          if (filterInput.orientation) {
            filter['orientation'] = filterInput.orientation;
          }
          if (filterInput.orientation) {
            filter['orientation'] = filterInput.orientation;
          }
          if (filterInput.point && filterInput.point.length === 2) {
            var maxDistance = (filterInput.maxDistance || 25) / 6378.1;
            filter['location.point'] = { $geoWithin: { $centerSphere: [ filterInput.point.reverse() , maxDistance ] } };
          }
          if (filterInput.trees && filterInput.trees.length > 0) {
            filter['trees'] = { "$in": filterInput.trees };
          }
          if (filterInput.mushrooms && filterInput.mushrooms.length > 0) {
            filter['mushrooms'] = { "$in": filterInput.mushrooms };
          }
          if (filterInput.free) {
            filter['description'] = { '$regex' : new RegExp('.*'+filterInput.free+'.*'), '$options' : 'i' };
          }
          if (Object.keys(filter).length === 1 && Object.keys(filter)[0] === 'user' && !filterInput.address) {
            return [];
          } else {
            if (filterInput.address) {
              var register = { "location": { "address": filterInput.address } };
              return GoogleMapsAPI.getLocation(register)
                .then((response) => {
                  console.log("response", response);
                  var maxDistance = (filterInput.maxDistance || 25) / 6378.1;
                  filter['location.point'] = { $geoWithin: { $centerSphere: [ response.location.point.reverse() , maxDistance ] } };
                  console.log("filter", JSON.stringify(filter));
                  return RegisterModel.find(filter).exec();
                })
                .catch(err => new Error(err));
            } else {
              return RegisterModel.find(filter).exec();
            }
          }
        })
        .catch(err => new Error(err));
    }
  }
};