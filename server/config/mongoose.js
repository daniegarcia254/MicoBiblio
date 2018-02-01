var env = process.env.NODE_ENV || 'development',
    config = require('./config'),
    mongoose = require('mongoose');

module.exports = {
    connect: function () {
        mongoose.Promise = global.Promise;
        var db = mongoose.connect(config.getDatabaseURL());
        mongoose.connection.on('error', function (err) {
            console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?', err);
        }).on('open', function () {
            console.log('Connection extablised with MongoDB')
        })
        return db;
    },
    close: function() {
        mongoose.connection.close();
    }
}