const _ = require('lodash');
const registerQueries = require('./register').queries;
const userQueries = require('./user').queries;

exports.queries = {
    registerQueries,
    userQueries
}