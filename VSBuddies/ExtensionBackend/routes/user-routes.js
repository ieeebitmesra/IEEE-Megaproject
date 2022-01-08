const express = require('express');
const {getUser, getMe} = require("../controllers/userController");

var router = express.Router();

router.get("/me",getMe)
router.get("/user/:uid",getUser);

module.exports ={
  routes: router
}
