const catchAsync = require("./../utlis/catchAsync");
const AppError = require("./../utlis/appError");
const Post = require("./../Models/postModel");
const City = require("./../Models/cityModel");
const axios = require("axios");
const express = require("express");
const router = express.Router();
exports.login = (req, res, next) => {
  res.status(200).render("login", {
    title: "Muco| Login",
  });
};
exports.logout = (req, res, next) => {
  req.cookies.jwt = "";
  res.redirect("/");
};
exports.home = (req, res, next) => {
  //console.log("Hello", res.locals.user);
  const user = res.locals.user;
  if (user) {
    res.status(200).render("homepage", {
      title: "Muco| Home",
    });
  }
  if (!user) {
    res.status(400).render("err", {
      error: "Something went wrong,Login again",
      status: 400,
    });
  }
};
exports.homepage = (req, res, next) => {
  //console.log("Hello", res.locals.user);
  const user = res.locals.user;
  if (user) {
    res.status(200).render("home", {
      title: "Muco| Home",
    });
  }
  if (!user) {
    res.status(400).render("err", {
      error: "Something went wrong,Login again",
      status: 400,
    });
  }
};
exports.yourPosts = (res, req, next) => {
  const user = res.locals.user;
  if (user) {
    res.status(200).render("yourPosts", {
      title: "Muco| Your Posts",
    });
  }
  if (!user) {
    res.status(400).render("err", {
      error: "Something went wrong,Login again",
      status: 400,
    });
  }
};
exports.signupverified = async (req, res, next) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: `${req.protocol}://${req.get("host")}/api/v1/users/signup/${
        req.params.verifyToken
      }`,
    });
    if (response.data.status == "success") {
      //console.log("Cookies ", req.cookies.jwt);
      res.redirect("/home");
    } else {
    }
  } catch (err) {
    //console.log(err);
    res.status(400).render("err", {
      error: "Something went wrong,Login again",
      status: 400,
    });
  }
};

exports.postDetail = async (req, res, next) => {
  const user = res.locals.user;
  if (!user) {
    res.status(400).render("err", {
      error: "Something went wrong,Login again",
      status: 400,
    });
  }
  const post = await Post.findById(String(req.params.postid));
  res.status(200).render("postdetail", {
    title: "Muco| Post Detail",
    post,
  });
};

exports.viewAllReview = async (req, res, next) => {
  const user = res.locals.user;
  if (!user) {
    res.status(400).render("err", {
      error: "Something went wrong,Login again",
      status: 400,
    });
  }
  const city = await City.findById(req.params.cityId);
  if (city)
    res.status(200).render("viewReview", {
      title: "Muco| Reviews",
      cityid: city._id,
    });
  if (!city) {
    res.status(400).render("err", {
      error: "No city found",
      status: 400,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  const token = req.params.resetToken;
  res.status(200).render("resetform", {
    title: "Muco| Reset Password",
    token,
  });
};
