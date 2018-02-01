const addRegister = require('./register/add').add;
const updateRegister = require('./register/update').update;
const removeRegister = require('./register/remove').remove;

exports.mutations = {
    addRegister,
    updateRegister,
    removeRegister
}