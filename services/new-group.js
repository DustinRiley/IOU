const Group = require('../model/group');
const generate = require('nanoid/generate')
const legalChars ='ABCDEFGHIJKLMONPQRSTUVWYXZabcdefghijklmnopqrstuvwyxz0123456789';

/**
 * 
 * @param {string} name name of the group
 * @param {boolean} isPublic whether the group is invite only
 * @param {object} user user object
 * 
 * @returns {object} new group object
 */

function newGroup(name, isPublic, user) {

    let url = generate(legalChars, 8);
    let group = new Group({
        users: [user._id],
        url: url,
        gName: name,
        pendingTansaction: [],
        approvedTranactions: [],
        isPublic: isPublic
    })

    return group.save();
}

module.exports.newGroup = newGroup;