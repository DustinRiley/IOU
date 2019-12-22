/**
 * 
 * @param {group object} group group object
 * @param {string} id id of user
 * 
 * @returns {boolean} returns if user can view group
 */
function hasAccess(group, id){
    if(!group.isPublic){
        if(id){
            if(group.users.includes(id)){
                return true;
            }
            else return false;
        }
        else return false;
    }
    else return true;
}

module.exports.hasAccess = hasAccess;