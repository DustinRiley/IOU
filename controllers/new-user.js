const hash = require('../services/salt-hash');
const createUser = require('../services/new-user');
const jwt = require('../helper/jwt-auth');

async function newUser(req){
    req=req.body;
    console.log(req.password, '  ', req.username);

    if(!req.password||!req.username){
        throw new Error('Need username and password')
    }
   
    const newHash =hash.pswdHash(req.password);
   
    const user = await createUser.newUser(req.username, newHash.salt, newHash.value);
   

    const auth = jwt.generateJWT(user.uName, user._id);
    return {user: user, auth:auth};
}
module.exports.newUser = newUser;