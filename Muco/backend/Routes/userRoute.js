const express = require("express");
const router = express.Router();
const authcontroller = require("./../Controllers/authcontroller");
const userController = require("./../Controllers/userController");
//const { getAllProducts } = require("../Controllers/productController")
router.post(
  "/signup/verify",
  userController.DoesUserExist,
  authcontroller.signupcreate
);
router.patch("/signup/:token", authcontroller.signupverified);
router.post("/login", userController.protect, authcontroller.login);
router.patch("/passwordReset", authcontroller.passwordResetToken);
router.patch("/passwordReset/:id", authcontroller.passwordReset);
router.patch(
  "/passwordUpdate",
  userController.checkJWT,
  authcontroller.passwordUpdate
);
router.patch("/updateMe", userController.checkJWT, authcontroller.updateMe);
module.exports = router;
