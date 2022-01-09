const Product=require('../models/productModel');

const checkAuth=async (req, res, next) => {
    let { id }=req.params;
    const product=await Product.findById(id).populate('creator');
    if (product.creator.id==req.user.id) {
        return next();
    }
    req.flash('error', 'You Are Not Autherized');
    res.redirect('/products');
}

module.exports=checkAuth;