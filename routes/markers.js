var express = require('express');
var router = express.Router();
var path = require('node:path');
const markerController = require('../controllers/markerController');
const authorization = require('../middlewares/authorization');
const fs = require("fs");
// const upload = require("../middlewares/uploads");
const multer = require("multer");

const ensureDirSync = (dirPath) => {
  try {
    return fs.mkdirSync(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Aquí puedes acceder a req.body o req.params para obtener el ID
    console.log(req.body.id);
    const id = req.body.id; // Asegúrate de enviar 'id' en el cuerpo de la solicitud
    const uploadPath = `public/uploads/markers/${id}`;

    // Crea la carpeta si no existe
    ensureDirSync(uploadPath);

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
  
const upload = multer({ storage: storage });

router.get('/', authorization.vistaAdmin, markerController.getAll);
router.get('/new', authorization.vistaAdmin, markerController.new);
router.post('/create', authorization.vistaAdmin, upload.fields([{ name: 'file', maxCount: 1 }, { name: 'glb', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), markerController.create);
router.post('/save-patt', authorization.vistaAdmin, markerController.save_pattern);
router.get('/edit/:id', authorization.vistaAdmin, markerController.edit);
router.post('/update', authorization.vistaAdmin, upload.fields([{ name: 'file', maxCount: 1 }, { name: 'glb', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), markerController.update);
router.get('/delete/:id', authorization.vistaAdmin, markerController.delete);


module.exports = router;
