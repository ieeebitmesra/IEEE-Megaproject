const Review=require('../models/reviewModel');

const checkAuth=async (req, res, next) => {
    let { id, rid }=req.params;
    const review=await Review.findById(rid).populate('creator');
    if (review.creator.id==req.user.id) {
        return next();
    }
    req.flash('error', 'You Are Not Autherized');
    res.redirect(`/products/${id}`);
}

module.exports=checkAuth;