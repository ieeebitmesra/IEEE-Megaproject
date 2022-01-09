const Order=require("../models/orderModel")
const Product=require('../models/productModel')
const Apperror=require('../utils/errorClass')
const catchAsyncerror=require('../middleware/catchAsyncerror')
const User=require("../models/user")

exports.renderOrders=async (req, res, next) => {

   const curUser=await User.findById(req.user.id)
      .populate({
         path: 'cartItems',
         populate: {
            path: 'cartItem',
         }
      });
   let totalPrice=0;
   for (let item of curUser.cartItems) {
      totalPrice+=item.cartItem.price;
   }
   totalPrice+=(totalPrice*0.05);
   if (totalPrice<=0) {
      req.flash("error", "Your cart is empty!");
      res.redirect('/cart')
      return;
   }
   res.render('cart/payment', { totalPrice: totalPrice, totalItems: curUser.cartItems.length, bucks: curUser.coins });

}

exports.newOrder=catchAsyncerror(async (req, res, next) => {
   const curUser=await User.findById(req.user.id)
      .populate({
         path: 'cartItems',
         populate: {
            path: 'cartItem',
         }
      });
   let totalPrice=0;
   for (let item of curUser.cartItems) {
      totalPrice+=item.cartItem.price;
   }
   if (totalPrice>curUser.coins) {
      req.flash('error', "You Have Insufficient Balance!");
      res.redirect('/cart');
      return;
   }
   const { roomNo, hostelNo, phoneNo }=req.body
   if (parseInt(phoneNo)/1e10==0) {
      req.flash('error', "Enter a Valid Phone Number!");
      res.redirect('/order');
      return;
   }

   for (let item of curUser.cartItems) {
      let product=await Product.findById(item.cartItem.id)
         .populate('creator');
      let order=new Order({
         shippingInfo: {
            HostelNumber: hostelNo,
            RoomNumber: roomNo,
            phoneNo: phoneNo
         }
      });
      let seller=await User.findById(product.creator.id);
      seller.coins+=(item.quantity*product.price);
      await seller.save();
      curUser.coins-=item.quantity*product.price;
      order.orderItem=item.cartItem.id;
      order.createdAt=new Date(Date.now()).toDateString()+" "+new Date(Date.now()).toLocaleTimeString();
      product.quantity-=item.quantity;
      await order.save();
      await product.save();
      curUser.orders.push(order);
   }
   curUser.cartItems.splice(0, curUser.cartItems.length);
   await curUser.save();
   req.flash('success', 'Order have been Successfully Placed');
   res.redirect('/');
})

exports.myOrders=catchAsyncerror(async (req, res, next) => {
   const curUser=await User.findById(req.user.id)
      .populate({
         path: 'orders',
         populate: {
            path: 'orderItem'
         }
      });
   let orders=Number(req.query.orders||3);
   res.render('cart/orders', { curUser, orders: orders });
})