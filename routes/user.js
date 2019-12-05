var express = require('express');
var router = express.Router();
const userModel = require('../model/user');
const auth = require('../helper/auth');
const newUser = require('../controllers/new-user');
const getUserById = require('../controllers/user-by-id');
const addGroup = require('../controllers/add-group-to-user')
const login = require('../controllers/login')
//import {getUserById} from('../controllers/user-by-id');


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



/* Get user by auth */
router.get('/current', auth.required, c(getUserById.getUserById, (req, res, next) => [req]));

/* POST New User*/
router.post('/new', c(newUser.newUser, (req, res, next) => [req.body]));

/* POST a group to a user 
//TODO add to pending groups
*/
router.post('/addgroup', auth.required, c(addGroup.addGroup, (req, res)=>[req]));

router.post('/login', auth.optional, c(login.login, (req,res)=>[req]));





/* POST Login */
router.post('/alogin', auth.optional, (req,res)=>{
    console.log(req.payload.id)
    let uName = req.body.user;
    let password = req.body.password;
    //console.log(uName+" "+password);
    userModel.findOne({uName:uName, password:password}, (err, doc)=>{
        if(doc){
            res.json({
                status:"success", 
                credentials:'login credentials TODO',
                user: doc
            })
        }
        else{
            res.json({
                status:'error',
                msg: 'Invalid user name or password'
            })
        }
    })

});

/* Get Groups */



/* Add Group to user */
router.post('/aaddgroup', (req,res)=>{
    let uId = req.body.uId;
    let groupToAdd = req.body.gId;

    userModel.findOne({_id:uId}, (err, user)=>{
        if(user){
            let groups = user.groups;
            groups.push(groupToAdd);
            user.groups = groups;
            user.save((err)=>{
             //   console.log(err);
                if(err){
                    res.json({
                        status:'error',
                        msg: 'Something went wrong with saving new group'
                        });
                }
                else{
                    res.json({
                        status:'success',
                        msg: 'added group: '+ groupToAdd
                    })
                }
            });
        }
        else{
            res.json({
                status:'error',
                msg: 'Could not find user'
                });
        }
    });
});

//TODO 
//Leave group
//Accept group
//Decline group




module.exports = router;
