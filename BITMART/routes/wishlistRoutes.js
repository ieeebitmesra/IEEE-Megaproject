const express=require('express');
const router=express.Router({ mergeParams: true });
const checkLogin=require('../middleware/checkLogin');
const catchAsync=require('../middleware/catchAsyncerror');
const wishlistController=require('../controllers/wishlistController');

router.route('/')
    .get(checkLogin, catchAsync(wishlistController.viewWishList));

router.route('/:id')
    .get(checkLogin, catchAsync(wishlistController.addProduct))
    
    .delete(checkLogin, catchAsync(wishlistController.removeProduct));

module.exports=router;