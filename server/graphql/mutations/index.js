const addRegister = require('./register/add').add;
const updateRegister = require('./register/update').update;
const removeRegister = require('./register/remove').remove;
const updateUser = require('./user/update').update;
const changePassword = require('./user/changePassword').changePassword;
const signup = require('./user/signup').signup;
const login = require('./user/login').login;

exports.mutations = {
    addRegister,
    updateRegister,
    removeRegister,
    updateUser,
    changePassword,
    signup,
    login
}