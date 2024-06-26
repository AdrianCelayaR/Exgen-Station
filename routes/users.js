var express = require('express');
var router = express.Router();
var path = require('node:path');
const userController = require('../controllers/usersController');
const authorization = require('../middlewares/authorization');

router.get('/', authorization.vistaAdmin, userController.getAll);
router.get('/new', authorization.vistaAdmin, userController.new);
router.post('/create', authorization.vistaAdmin, userController.create);
router.get('/edit/:id', authorization.vistaAdmin, userController.edit);
router.post('/update', authorization.vistaAdmin, userController.update);
router.get('/delete/:id', authorization.vistaAdmin, userController.delete);


module.exports = router;
