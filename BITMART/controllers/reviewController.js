const express=require('express');
const Review=require('../models/reviewModel');
const Product=require('../models/productModel');
const User=require('../models/user');
const Apprerror=require('../utils/errorClass');
const cloudinary=require('cloudinary').v2;

module.exports.create=async (req, res, next) => {
    console.log(req.body, req.files);
    let { id }=req.params;
    const review=new Review(req.body);
    review.creator=req.user.id;
    for (let file of req.files) {
        let img={
            public_id: file.filename,
            url: file.path,
        }
        review.images.push(img);
    }
    review.date=new Date(Date.now()).toDateString()+" "+new Date(Date.now()).toLocaleTimeString();
    const product=await Product.findById(id);
    if (product==undefined) {
        throw new Apprerror('Product Not Found', 404);
    }
    product.rating=(product.rating*product.noOfReviews+review.rating);
    product.noOfReviews++;
    product.rating=product.rating/product.noOfReviews;
    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'Review Posted Successfully');
    res.redirect(`/products/${id}`);
}

module.exports.delete=async (req, res, next) => {
    let { id, rid }=req.params;
    let product=await Product.findById(id).populate('reviews');
    let review=await Review.findById(rid)
        .populate('images');
    console.log(review);
    if (product==undefined) {
        throw new Apprerror('Product Not Found', 404);
        return;
    }
    for (let i=0; i<product.reviews.length; i++) {
        if (product.reviews[i].id==rid) {
            product.reviews.splice(i, 1);
            break;
        }
    }
    for (image of review.images) {
        cloudinary.uploader.destroy(image.public_id, (err, result) => {
            console.log('Deleted Image!');
        });
    }
    product.rating=Math.max((product.rating*product.noOfReviews-review.rating), 0);
    product.noOfReviews--;
    product.rating=(product.rating/product.noOfReviews);
    await Review.findByIdAndDelete(rid);
    await product.save();
    req.flash('success', 'Review Deleted Successfully!');
    res.redirect(`/products/${id}`);
}