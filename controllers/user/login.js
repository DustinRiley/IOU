const userByName = require('../services/user-by-name');
const userById = require('../services/user-by-id')
const saltHash = require('../services/salt-hash');
const jwt = require('../helper/jwt-auth')

async function login(req){
    //const id = req.payload.id;
    console.log(req.payload)
    if(typeof req.payload !== 'undefined'){
        
        return await userById.getUser(req.payload.id);
    }else{
        const username = req.body.username;
        const password = req.body.password;

        if(!username||!password){
            throw new Error('Need Username & Password')
        }

        let user = await userByName.getUser(username);
        if(saltHash.checkHash(password, user.salt, user.hash)){
            const auth = jwt.generateJWT(user.uName, user._id);
            return {user: user, auth:auth};
        }
        else{
            throw new Error('Username or password is incorrect')
        }
    }

}

module.exports.login = login;