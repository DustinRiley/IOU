const User = require('../model/user')

/**
 * 
 * @param {string} id uniquer user Id
 * 
 * @returns {object} user object
 */


function getUser(id){
    return User.findById(id).exec();
}

module.exports.getUser = getUser;