const express=require('express');
const User=require('../models/user');
const Product=require('../models/productModel');

module.exports.addProduct=async (req, res, next) => {
    let { id }=req.params;
    let user=await User.findById(req.user.id)
        .populate('wishList');
    let product=await Product.findById(id);
    let flag=false;
    for (let i=0; i<user.wishList.length; i++) {
        if (user.wishList[i].id==id) {
            flag=true;
            break;
        }
    }
    if (flag==true) {
        req.flash('error', 'Item Already Wishlisted');
        res.redirect(`/products/${id}`);
    }
    else {
        user.wishList.push(product);
        await user.save();
        req.flash('success', 'Product Successfully WishListed');
        res.redirect(`/products/${id}`);
    }
}

module.exports.removeProduct=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(req.user.id)
        .populate('wishList');
    for (let i=0; i<user.wishList.length; i++) {
        if (user.wishList[i].id==id) {
            user.wishList.splice(i, 1);
            break;
        }
    }
    await user.save();
    req.flash('success', 'Product Successfully Removed From WishList');
    res.redirect('/wishlist');
}

module.exports.viewWishList=async (req, res, next) => {
    const curUser=await User.findById(req.user.id)
        .populate({
            path: 'wishList',
            populate: {
                path: 'images'
            }
        });
    let total=(Number)(req.query.total||4);
    curUser.wishList=curUser.wishList.filter((item) => { return item!=null });
    await curUser.save();
    res.render('cart/wishlist', { curUser, total: total });
}

