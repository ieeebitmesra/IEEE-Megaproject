const checkLogin=(req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You Must Be Logged In!');
    res.redirect('/signin');
}

module.exports=checkLogin;