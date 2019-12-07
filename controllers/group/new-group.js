const newGroupService = require('../../services/new-group');
const userById = require('../../services/user-by-id')
const addGroupToUser = require('../../services/add-group-to-user')


async function newGroup(req){
    let id = req.payload.id;
    let isPublic = req.body.isPublic;
    let name = req.body.name;

    let user = await userById.getUser(id);

    let newGroup = await newGroupService.newGroup(name, isPublic, user);

    user.groups.push(newGroup._id);
    user.save();

    return newGroup;

}

module.exports.newGroup = newGroup;