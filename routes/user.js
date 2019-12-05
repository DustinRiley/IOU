var express = require('express');
var router = express.Router();
const userModel = require('../model/user');
const auth = require('../helper/auth');
const newUser = require('../controllers/new-user');
const getUserById = require('../controllers/user-by-id');
const addGroup = require('../controllers/user/add-group-to-user')
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
router.post('/new', c(newUser.newUser, (req, res, next) => [req]));

/* POST a group to a user 
//TODO add to pending groups
*/
router.post('/addgroup', auth.required, c(addGroup.addGroup, (req, res)=>[req]));

/*POST Login*/
router.post('/login', auth.optional, c(login.login, (req,res)=>[req]));

//TODO 
//Leave group
//Accept group
//Decline group




module.exports = router;
