const express=require('express');
const app=express();
const passport=require('passport');
const router=express.Router();
const user=require('../controllers/userController');
const checkLogin=require('../middleware/checkLogin');
const checkUserAuth=require('../middleware/checkUserAuth');
const catchAsync=require('../middleware/catchAsyncerror');

router.route('/:id')
    .get(user.profile)
    .put(checkLogin, checkUserAuth, catchAsync(user.edit))
    .delete(checkLogin, checkUserAuth, catchAsync(user.delete));

router.route('/:id/edit')
    .get(checkLogin, checkUserAuth, user.renderedit);

module.exports=router;