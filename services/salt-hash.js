var crypto = require('crypto');


 function genSalt(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 
            .slice(0,length);   
};

/**
 * Given a password returns a object with a salt and hash
 * for the password
 * 
 * @param {string} passowrd A password you want to hash
 */
exports.pswdHash= (password)=>{
    var salt = genSalt(16);
    var hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        value:value
    };
};


/**
 * checks to see if given a salt and a password if it hashes
 * to the user hash
 * 
 * @param {string} pswd The users passowrd
 * @param {string} salt The users salt hex
 * @param {string} userHash The users hashed password
 * @returns {boolean} if the hashes match
 */
exports.checkHash=(pswd, salt, userHash)=>{
    var hash= crypto.createHmac('sha512', salt);
    hash.update(pswd);
    var value = hash.digest('hex');
    return value===userHash;
}





