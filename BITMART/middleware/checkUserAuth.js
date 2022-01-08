const User=require('../models/user');

const checkAuth=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(id);
    if (user.id==req.user.id) {
        return next();
    }
    req.flash('error', 'You Are Not Autherized');
    res.redirect(`/users/${id}`);
}

module.exports=checkAuth;