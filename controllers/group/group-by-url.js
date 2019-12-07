const groupByUrlService = require('../../services/group-by-url');
const userHasAccess = require('../../services/user-has-access-to-group')


async function getGroup(req){
    let url = req.body.url;
    if(req.payload){
        var id = req.payload.id;
    }
    let group = await groupByUrlService.getGroup(url);

    if(userHasAccess.hasAccess(group, id)){
        return group;
    }
    else throw new Error('User does not have access to group')

}

module.exports.getGroup = getGroup;