const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports.generateJWT = (uName, id)=>{
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      Uname: uName,
      id: id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, config.secrert);
  }
  
  