const Group = require('../model/group');


function getGroup(url){
    return Group.findOne({url:url}).exec()
}

module.exports.getGroup = getGroup;