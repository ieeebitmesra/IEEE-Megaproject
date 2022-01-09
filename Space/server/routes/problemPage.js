const express = require('express');
const router = express.Router();
const problemPageController = require('../controllers/problemPage_controller');
const codeController = require('../controllers/code_controller');
router.get('/:id', problemPageController.pPage);
router.post('/solved',codeController.solved);

module.exports = router;