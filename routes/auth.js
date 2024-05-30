var express = require('express');
var router = express.Router();
var path = require('node:path');
const authController = require('../controllers/authController');

router.get('/login', authController.loginView);
router.post('/login', authController.login);
router.get('/register', authController.registerView);
router.post('/register', authController.register);

module.exports = router;
