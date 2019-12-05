const expressJwt = require('express-jwt');
const config = require('../config');   
        




const getTokenFromHeaders = (req) => {
    
    const { headers: { authorization } } = req;
    
    if(authorization && authorization.split(' ')[0] === 'Token') {
        
        return authorization.split(' ')[1];
      
    }
    return null;
  };
  
  const auth = {
    required: expressJwt({
      secret: config.secrert,
      userProperty: 'payload',
      getToken: getTokenFromHeaders,
    }),
    optional: expressJwt({
      secret: config.secrert,
      userProperty: 'payload',
      getToken: getTokenFromHeaders,
      credentialsRequired: false,
    }),
  };
  
  module.exports = auth;