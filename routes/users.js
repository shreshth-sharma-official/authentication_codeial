const express = require('express');
const passport=require('passport');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);



router.post('/create', usersController.create);

// // this route is for manual authentication
// router.post('/create-session', usersController.createSession);

//this route is for passport.js local authentication
router.post('/create-session',passport.authenticate(
    'local',{
            failureRedirect:'/users/sign-in'
            }),
            usersController.createSession);

module.exports = router;