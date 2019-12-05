const User = require('../model/user')

function getUser(name){
    return User.findOne({uName:name}).exec();
}

module.exports.getUser = getUser;