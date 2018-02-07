const addRegister = require('./register/add').add;
const updateRegister = require('./register/update').update;
const removeRegister = require('./register/remove').remove;
const signup = require('./user/signup').signup;

exports.mutations = {
    addRegister,
    updateRegister,
    removeRegister,
    signup
}