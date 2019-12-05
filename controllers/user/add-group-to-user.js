const addGroupService = require('../../services/add-group-to-user');
const userByIdService = require('../../services/user-by-id')

async function addGroup(req){
    const id = req.payload.id;
    const gId = req.body.gId;
    const user = await userByIdService.getUser(id);
    return addGroupService.addGroup(user, gId);
}

module.exports.addGroup = addGroup;