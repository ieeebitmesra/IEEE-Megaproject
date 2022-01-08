const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    quantity: {
        type: Number,
        default: 1,
    }
});

const Cart=new mongoose.model('Cart', cartSchema);

module.exports=Cart;