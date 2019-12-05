var express = require('express');
var router = express.Router();
const groupModel = require('../model/group');
const userModel = require('../model/user');
const generate = require('nanoid/generate')
const legalChars ='ABCDEFGHIJKLMONPQRSTUVWYXZabcdefghijklmnopqrstuvwyxz0123456789';

/* GET Group Info By Url. */
router.get('/:url', function(req, res, next) {
    let url = req.params.url;
    groupModel.findOne({url:url},(err, group)=>{
        if(group){
            res.json({
                status: 'success',
                group: group
            })
        }
        else{
            res.json({
                status: 'error',
                msg: err
            })
        }
    })
    
});

/* POST New Group */
router.post('/new', (req,res)=>{
    let originalUser = req.body.uId;
    //IMPORTANT FUTURE let cred = req.body.credentials;
    let  private = req.body.private;
    let name = req.body.name;
    let url = generate(legalChars, 8);
    console.log("here")
    let group = new groupModel({
        users: [originalUser],
        url: url,
        gName: name,
        pendingTansaction: [],
        approvedTranactions: [],
        isPrivate: private
    })
    console.log(JSON.stringify(group));
    group.save(group, (err)=>{
        if(err){
            json.res({
                status: 'error',
                msg: err
            })
        }
        else{
            res.json({
                status: 'succes',
                group: group
            })
        }
    })
})

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
