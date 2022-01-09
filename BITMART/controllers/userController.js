const User=require('../models/user');
const passport=require('passport');
const express=require('express');

module.exports.profile=async (req, res, next) => {
    let { id }=req.params;
    const curUser=await User.findById(id);
    const firstname=curUser.name.split(" ")[0];
    const lastname=curUser.name.split(" ")[1];
    res.render('user/profilepage', { curUser, firstname, lastname });
}

module.exports.renderedit=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findById(id);
    res.render('user/edit', { user });
}

module.exports.edit=async (req, res, next) => {
    let { id }=req.params;
    const user=await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    req.flash('success', 'Successfully Updated User Details!');
    res.redirect(`/`);
}

module.exports.delete=async (req, res, next) => {
    let { id }=req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'Successfully Deleted User!');
    res.redirect('/');
}