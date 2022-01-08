const express = require('express');
const router = express.Router();
const updateController = require('../controllers/update_controller.js');
router.post('/summary/:id',updateController.updateSummary);
router.post('/about/:id',updateController.updateAbout);

module.exports = router;