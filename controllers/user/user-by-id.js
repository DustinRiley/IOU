const getUserService = require('../services/user-by-id')

async function getUserById(req){
    const id = req.payload.id;
    return await getUserService.getUser(id);
}

module.exports.getUserById = getUserById;