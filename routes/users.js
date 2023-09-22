const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users');
const nodemailer = require('nodemailer');




router.get('/register' , users.renderRegister);


router.post('/register' , catchAsync(users.register));

router.get('/login' , users.renderLogin);


//authenticate using the local strategy
router.post('/login'  , passport.authenticate('local' , {failureFlash: true , failureRedirect: '/login'}), users.login);

router.get('/logout', users.logout); 

module.exports = router;