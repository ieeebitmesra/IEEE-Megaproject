const express=require('express');
const router=express.Router({ mergeParams: true });
const multer=require('multer');
const { storage }=require('../cloudinary/config');
const upload=multer({ storage });
const catchAsyncerror=require('../middleware/catchAsyncerror');
const catchAsync=require('../middleware/catchAsyncerror');
const checkLogin=require('../middleware/checkLogin');
const checkReviewAuth=require('../middleware/checkReviewAuth');
const reviewController=require('../controllers/reviewController');


router.route('/new')
    .post(checkLogin, upload.array('images'), catchAsyncerror(reviewController.create))
router.route('/:rid')
    .delete(checkLogin, checkReviewAuth, catchAsyncerror(reviewController.delete));


module.exports=router;