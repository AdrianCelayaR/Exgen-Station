var express = require('express');
var router = express.Router();
var path = require('node:path');
const progresoController = require('../controllers/progresoUsuarioMarcadoresController');
const authorization = require('../middlewares/authorization');

router.post('/actualizar-progreso', progresoController.actualizar_progreso);
// router.get('/', authorization.vistaAdmin, progresoController.getAll);
// router.get('/new', authorization.vistaAdmin, progresoController.new);
// router.post('/create', authorization.vistaAdmin, progresoController.create);
// router.get('/edit/:id', authorization.vistaAdmin, progresoController.edit);
// router.post('/update', authorization.vistaAdmin, progresoController.update);
// router.get('/delete/:id', authorization.vistaAdmin, progresoController.delete);


module.exports = router;
