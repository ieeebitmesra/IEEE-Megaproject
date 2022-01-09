const express = require('express');
const router = express.Router();
const problemsetController = require('../controllers/problemset_controller.js');
const puzzlesController = require('../controllers/puzzles_controller.js');
router.get('/filter',problemsetController.getFilterData);
router.get('/puzzleFilter',puzzlesController.getFilterData);
module.exports = router;