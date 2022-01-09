const express = require('express');
const router = express.Router();
const puzzlePageController = require('../controllers/puzzlePage_controller');

router.get('/:id', puzzlePageController.getPuzzle);

module.exports = router;