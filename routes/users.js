var express = require('express');
var router = express.Router();
var path = require('node:path');
const userController = require('../controllers/usersController');
const authorization = require('../middlewares/authorization');

router.get('/', authorization.vistaAdmin, userController.getAllUsers);


module.exports = router;
