const newGroupService = require('../../services/new-group');
const userById = require('../../services/user-by-id')


async function newGroup(req){
    let id = req.payload.id;
    let isPublic = req.body.isPublic;
    let name = req.body.name;

    let user = await userById.getUser(id);

    return newGroupService.newGroup(name, isPublic, user);

}

module.exports.newGroup = newGroup;