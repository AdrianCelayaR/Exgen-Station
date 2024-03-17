var express = require('express');
var router = express.Router();
var path = require('node:path');
const userController = require('../controllers/usersController');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   // Asegúrate de proporcionar la ruta absoluta al archivo HTML
//   res.sendFile(path.join(__dirname, '../public/views/Users/index.html'));
// });
router.get('/', userController.getAllUsers);


module.exports = router;
