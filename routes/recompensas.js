var express = require('express');
var router = express.Router();
var path = require('node:path');
const recompensaController = require('../controllers/recompensasController');
const authorization = require('../middlewares/authorization');

router.get('/', authorization.vistaAdmin, recompensaController.getAll);
router.get('/new', authorization.vistaAdmin, recompensaController.new);
router.post('/create', authorization.vistaAdmin, recompensaController.create);
router.get('/edit/:id', authorization.vistaAdmin, recompensaController.edit);
router.post('/update', authorization.vistaAdmin, recompensaController.update);
router.get('/delete/:id', authorization.vistaAdmin, recompensaController.delete);


module.exports = router;
