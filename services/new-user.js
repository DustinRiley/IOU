const userModel = require('../model/user');
const User = require('../model/user')

function newUser (username, salt, hash){
     let user = new userModel({
        uName: username.toLowerCase(),
        salt: salt,
        hash: hash,
        globalDebt: 0
    })
   return user.save();
}

module.exports.newUser = newUser;