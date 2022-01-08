const mongoose=require('mongoose');
const Cart=require('../models/cartModel');
const passportLocalMongoose=require('passport-local-mongoose');


const userSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        roll:
        {
            type: String,
            required: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products'
            }
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order'
            }
        ],
        cartItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart'
        }],
        wishList: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }],
        coins: {
            type: Number,
            default: 5000
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    }
);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User=new mongoose.model('User', userSchema);

module.exports=User;