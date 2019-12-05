const User = require('../model/user')

function addGroup(user, gId){
    user.groups.push(gId);
    return user.save();   
}

module.exports.addGroup = addGroup;