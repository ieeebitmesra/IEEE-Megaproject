const User=require('../models/user');
const passport=require('passport');
const localStrat=require('passport-local');
const express=require('express');
const { nanoid }=require('nanoid');
const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport(
    {
        service: 'hotmail',
        auth: {
            user: process.env.email,
            pass: process.env.email_password,
        }
    }
);

module.exports.renderSignin=(req, res) => {
    res.render('user/login');
}


module.exports.register=async (req, res, next) => {
    try {
        console.log(req.body);
        const user=new User(
            {
                name: req.body.name,
                email: req.body.email,
                roll: req.body.roll
            }
        );
        if (req.body.email.includes('@bitmesra.ac.in')==false) {
            req.flash('error', 'You Must Enter with BIT Mesra email Id');
            res.redirect('/signin');
        }
        const regUser=await User.register(user, req.body.password);


        req.logIn(regUser, (err) => {
            if (err) {
                console.log(err);
                req.flash('error', err.message);
                res.redirect('/signin');
            }
        });
        req.flash('success', 'Successfully Registered!');
        if (req.session.returnTo) {
            res.redirect(req.session.returnTo);
            return;
        }
        const curUser=regUser;
        res.redirect('/');
    }
    catch (err) {
        console.log(err);
        req.flash('error', err.message);
        res.redirect('/signin');
    }
}

module.exports.login=(req, res, next) => {

    const curUser=req.user;
    if (req.session.returnTo) {
        res.redirect(req.session.returnTo);
        return;
    }
    req.flash('success', 'Welcome Back!');
    res.redirect('/');
}

module.exports.renderForgot=(req, res, next) => {
    res.render('user/forgot');
}

module.exports.forgot=async (req, res, next) => {
    const token=nanoid(10);
    const user=await User.findOne({ email: req.body.email });
    if (user==undefined) {
        req.flash('error', 'No account with that email address exists');
        res.redirect('/forgot');
    }
    user.resetPasswordToken=token;
    user.resetPasswordExpires=Date.now()+43200;
    await user.save();
    const resetEmail={
        from: process.env.email,
        to: req.body.email,
        subject: "Password Reset",
        text: `
        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        http://${req.headers.host}/reset/${token}
        If you did not request this, please ignore this email and your password will remain unchanged.
      `,
    }
    transporter.sendMail(resetEmail, (err, info) => {
        if (err) {
            console.log(err);
            res.send('Error While Sending Mail');
        }
        else {
            console.log(info.response);
            req.flash('success', `An e-mail has been sent to ${req.body.email} with further instructions`);
            res.redirect('/forgot');
        }
    })
}

module.exports.renderReset=async (req, res, next) => {
    let { token }=req.params;
    const user=await User.findOne({ resetPasswordToken: token });
    if (!user||user.resetPasswordExpires<Date.now()) {
        req.flash('error', 'Password reset token is invalid or has expired');
        res.redirect('/forgot');
    }
    console.log(user);
    res.render('user/reset', { token });
}

module.exports.reset=async (req, res, next) => {
    if (req.body.password!=req.body.cpass) {
        req.flash('error', 'Both Fields Should Match!');
        res.redirect('/reset');
    }
    let { password }=req.body;
    const user=await User.findOne({ resetPasswordToken: req.params.token });
    console.log(user, password);
    await user.setPassword(password);
    await user.save();
    const resetEmail={
        to: user.email,
        from: process.env.email,
        subject: 'Your password has been changed',
        text: `
        Password Reset Successfull
         This is a confirmation that the password for your account "${user.email}" has just been changed.
          Please Login With New Credentials
        `,
    }
    transporter.sendMail(resetEmail, (err, info) => {
        if (err) {
            console.log(err);
            res.send('Error While Sending Mail');
        }
        else {
            console.log(info.response);
            user.resetPasswordExpires=null;
            user.resetPasswordToken=null;
            req.flash('success', 'Password Reset Successfull!');
            res.redirect('/signin');
        }
    })

}

module.exports.logout=(req, res, next) => {
    req.logOut();
    req.flash('success', 'Aloha! See You Soon');
    res.redirect('/');
}