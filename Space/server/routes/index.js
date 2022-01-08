const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js');
const codeController = require('../controllers/code_controller.js');
const allUserController = require('../controllers/alluser_controller');
const solutionController = require('../controllers/solution_controller');

router.post('/login', userController.login);
router.post('/signUp', userController.signUp);
router.post('/code', userController.code);
router.post('/feedback', userController.feedback);
router.post('/check', userController.check);
router.post('/checkMail', userController.checkMail);
router.get('/leaderboard', allUserController.leaderboard);
router.post('/resetPass', userController.resetPass);
router.post('/updatePassword', userController.updatePassword);
router.use('/profile', require('./profile'));
router.use('/update', require('./update'));
router.use('/problemset', require('./problemset'));
router.use('/problemPage', require('./problemPage'));
router.use('/puzzlePage', require('./puzzlePage'));
router.post('/run', codeController.getResult);
router.post('/solution', codeController.solutionLog)
router.get('/solution/:id', solutionController.getSolution)


module.exports = router;