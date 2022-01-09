const express=require('express');
const User=require('../models/user');
const Cart=require('../models/cartModel');
const Product=require('../models/productModel');
const Features=require('../utils/features');

module.exports.addProduct=async (req, res, next) => {
    let { id }=req.params;
    let { quantity }=req.query;
    if (quantity==undefined) {
        quantity=1;
    }
    const user=await User.findById(req.user.id)
        .populate({
            path: 'cartItems',
            populate: {
                path: 'cartItem'
            }
        });
    const product=await Product.findById(id);
    if (quantity<1) {
        req.flash('error', 'Please Select Product Quantity');
        res.redirect(`/products/${id}`);
    }
    else if (quantity>product.quantity) {
        req.flash('error', 'Please Select Lesser Quantity');
        res.redirect(`/products/${id}`);
    }
    else {
        const item=new Cart({
            cartItem: product,
            quantity: quantity
        });
        let flag=false;
        for (let carti of user.cartItems) {
            if (carti.cartItem.id==product.id) {
                carti.quantity+=item.quantity;
                if (carti.quantity>product.quantity) {
                    req.flash('error', 'Not Enough Products In Stock');
                    res.redirect(`/products/${product.id}`);
                    return;
                }
                flag=true;
                await carti.save();
                break;
            }
        }
        if (flag==false) {
            await item.save();
            user.cartItems.push(item);
        }
        await user.save();
        req.flash('success', 'Product Successfully Added to the Cart');
        res.redirect(`/products/${id}`);
    }
}

module.exports.removeProduct=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(req.user.id)
        .populate('cartItems');
    const item=await Cart.findById(id)
        .populate('cartItem');
    const product=await Product.findById(item.cartItem.id);
    for (let i=0; i<user.cartItems.length; i++) {
        if (user.cartItems[i].id==item.id) {
            user.cartItems.splice(i, 1);
            break;
        }
    }
    await Cart.findByIdAndDelete(id);
    await user.save();
    await product.save();
    req.flash('success', 'Product Successfully Removed From Cart');
    res.redirect('/cart');
}

module.exports.viewCart=async (req, res, next) => {
    const curUser=await User.findById(req.user.id)
        .populate({
            path: 'cartItems',
            populate: {
                path: 'cartItem',
                populate: {
                    path: 'images'
                }
            }
        });

    let total=(Number)(req.query.total||4);
    curUser.cartItems=curUser.cartItems.filter((item) => { return item.cartItem!=null });
    await curUser.save();
    let totalPrice=0;
    for (item of curUser.cartItems) {
        totalPrice+=(item.cartItem.price*item.quantity);
    }
    res.render('cart/cart', { curUser, total: total, totalPrice: totalPrice });
}

