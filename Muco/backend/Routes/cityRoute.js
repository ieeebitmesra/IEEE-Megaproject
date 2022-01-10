const express = require("express");
const router = express.Router();
const cityController = require("../Controllers/cityController.js");
router
  .route("/registeradmin")
  .post(cityController.protect, cityController.registeradmin);
router.route("/getcity").get(cityController.getCity);
router.route("/getonecity/:id").get(cityController.getOneCity);
router.route("/getcityrating/:cityId").get(cityController.getRating);
module.exports = router;
