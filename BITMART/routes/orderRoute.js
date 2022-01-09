const { render }=require("ejs");
const express=require("express")
const { renderOrders, newOrder, myOrders }=require("../controllers/orderController")

const router=express.Router({ mergeParams: true });
const checkLogin=require('../middleware/checkLogin');

router.route('/')
    .get(checkLogin, renderOrders)
    .post(checkLogin, newOrder);

router.route('/my')
    .get(checkLogin, myOrders);

module.exports=router