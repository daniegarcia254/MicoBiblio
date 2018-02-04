const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const googleMapsClient = require('@google/maps').createClient({
    key: config.GoogleApiKey,
    Promise: Promise
});

const getElevation = function(register) {
    return googleMapsClient.elevation({
        locations: [register.location.point]
    }).asPromise().then((response) => {
        register.elevation = response.json.results[0].elevation;
        return register;
    }).catch((err) => {
        throw err;
    });
}

const getAddress = function(register) {
    return googleMapsClient.reverseGeocode({
        latlng: [register.location.point.lat, register.location.point.lng],
        language: 'es'
    }).asPromise().then((response) => {
        register.location.address = response.json.results[0].formatted_address;
        if (!register.elevation) {
            return getElevation(register);
        } else {
            return register;
        }
    }).catch((err) => {
        throw err;
    });
}

const getLocation = function(register) {
    return googleMapsClient.geocode({
        address: register.location.address,
        language: 'es'
    }).asPromise().then((response) => {
        register.location.point = response.json.results[0].geometry.location;
        if (!register.elevation) {
            return getElevation(register);
        } else {
            return register;
        }
    }).catch((err) => {
        throw err;
    });
}

exports.GoogleMapsAPI = {
    getAddress,
    getLocation
}