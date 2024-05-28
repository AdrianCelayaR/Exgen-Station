var express = require('express');
var router = express.Router();
var path = require('node:path');
const recompensaController = require('../controllers/recompensasController');
const authorization = require('../middlewares/authorization');

router.get('/', authorization.vistaDesigner, recompensaController.getAll);
router.get('/new', authorization.vistaDesigner, recompensaController.new);
router.post('/create', authorization.vistaDesigner, recompensaController.create);
router.get('/edit/:id', authorization.vistaDesigner, recompensaController.edit);
router.post('/update', authorization.vistaDesigner, recompensaController.update);
router.get('/delete/:id', authorization.vistaDesigner, recompensaController.delete);


module.exports = router;
