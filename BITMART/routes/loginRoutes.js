const express=require('express');
const app=express();
const passport=require('passport');
const router=express.Router({ mergeParams: true });
const login=require('../controllers/loginController');
const catchAsync=require('../middleware/catchAsyncerror');


router.route('/signin')
    .get(login.renderSignin);

router.route('/login')
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/signin' }), login.login);

router.route('/register')
    .post(catchAsync(login.register));

router.route('/logout')
    .get(login.logout);

router.route('/forgot')
    .get(login.renderForgot)
    .post(login.forgot);

router.route('/reset/:token')
    .get(login.renderReset)
    .post(login.reset);

module.exports=router;

