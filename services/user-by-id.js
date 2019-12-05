const User = require('../model/user')

function getUser(id){
    return User.findById(id).exec();
}

module.exports.getUser = getUser;