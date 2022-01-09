const express = require('express');
const updateExtension = require('../controllers/extensionController');

var router = express.Router()

router.post("/me",updateExtension)
module.exports = {
  routes: router
}

