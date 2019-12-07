var express = require('express');
var router = express.Router();
const auth = require('../helper/auth');
const groupModel = require('../model/group');
const userModel = require('../model/user');
const newGroup = require('../controllers/group/new-group');
const getGroupByUrl = require('../controllers/group/group-by-url')


const controllerHandler = (promise, params) => async (req, res, next) => {
    const boundParams = params ? params(req, res, next) : [];
    try {
      const result = await promise(...boundParams);
      console.log('this is the result', result)
      return res.json(result || { message: 'OK' });
    } catch (error) {
        console.log(error)
      return res.status(500).json({error: error.toString()});
    }
  };
  const c = controllerHandler;

/*Post new group*/ 
router.post('/new', auth.required, c(newGroup.newGroup, (req, res)=>[req]));

/* Get group by url auth.required if is private*/
router.get('/', auth.optional, c(getGroupByUrl.getGroup, (req,res)=>[req]))



/* Post New Transaction */

/* Post Add New Group Member */
router.post('/add/member', (req, res)=>{
    let uId = req.body.user;
    let gId = req.body.group;

    groupModel.findOne({_id:gId}, (err, group)=>{
        if(group){
            let listOfMembers= group.users;
            userModel.findOne({_id:uId},(err, user)=>{
                if(user){
                    let userGroups = user.groups;
                    userGroups.push(gId);
                    user.groups= userGroups;
                }else{
                    res.json({
                        status: 'error',
                        msg: 'Invalid user id'
                    })
                }
            })

        }
        else{
            res.json({
                status: 'error',
                msg: 'invalid group id'
            })
        }
    })

    
});





module.exports = router;
