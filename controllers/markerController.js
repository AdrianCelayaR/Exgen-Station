const models = require("../models");
const path = require('path');
const fs = require("fs");
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');

exports.getAll = async (req, res) => {
    alerta = req.flash('alert');
    notice = req.flash('notice');
    if (alerta.length === 0) {
        alerta = null;
    }
    if (notice.length === 0) {
        notice = null;
    }
    await models.markers.findAll().then(markers => {
        res.render(path.join(__dirname, '../public/views/markers/index'), {markers: markers, notice: notice, alert: alerta});
        // res.sendFile(path.join(__dirname, '../public/views/Users/index.html'), { users: users });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.new = async (req, res) => {
    alerta = req.flash('alert');
    notice = req.flash('notice');
    if (alerta.length === 0) {
        alerta = null;
    }
    if (notice.length === 0) {
        notice = null;
    }

    // obtener el tamaño de la tabla markers
    const markers = await models.markers.findAll();
    const new_id = markers.length + 1;

    res.render(path.join(__dirname, '../public/views/markers/new'), {notice: notice, alert: alerta, new_id: new_id});
    // res.sendFile(path.join(__dirname, '../public/views/Users/new.html'));
}

exports.create = async (req, res) => {
    console.log(req.body);
    const { id, preset, position, rotation, scale, model_position, model_rotation, model_scale, anim_conf, bucle_audio, text_data, text_color, text_position, text_rotation, text_scale } = req.body;
    console.log(req.files); 
    var patt = null;
    var glb = null;
    var audio = null;

    // Recorrer las claves (propiedades) de req.files
    Object.keys(req.files).forEach(function(key) {
        // Obtener el nombre del campo y la información del archivo
        var fieldName = req.files[key][0].fieldname;
        var path = req.files[key][0].path;
        
        // Guardar los datos según el nombre del campo
        if (fieldName === 'file') {
            // Obtener el originalname sin extension en una variable llamada nombre y la extension en una variable llamada extension
            var originalname = req.files[key][0].originalname;
            const lastDotIndex = originalname.lastIndexOf(".");
            const nombreArchivo = originalname.substring(0, lastDotIndex);

            patt = {
                originalname: `${nombreArchivo}.patt`,
                path: path
            };
        } else if (fieldName === 'glb') {
            glb = {
                originalname: req.files[key][0].originalname,
                path: path
            };
        } else if (fieldName === 'audio') {
            audio = {
                originalname: req.files[key][0].originalname,
                path: path
            };
        }
    });

    // Imprimir los datos guardados por separado
    console.log("Patt:", patt);
    console.log("uploads/markers/"+id+"/"+patt.originalname);
    console.log("glb:", glb);
    console.log("uploads/markers/"+id+"/"+glb.originalname);
    console.log("Audio:", audio);
    console.log(audio === null ? `uploads/markers/${id}/mixkit-toy-train-whistle-1631.wav` : `uploads/markers/${id}/${audio.originalname}`);

    // Crear un nuevo marcador
    try {
        const marker = await models.markers.create({
            preset: preset,
            patt: `uploads/markers/${id}/${patt.originalname}`,
            marker_position: position,
            marker_rotation: rotation,
            marker_scale: scale,
            src: `uploads/markers/${id}/${glb.originalname}`,
            model_position: model_position,
            model_rotation: model_rotation,
            model_scale: model_scale,
            anim_conf: anim_conf,
            text_data: text_data,
            text_color: text_color,
            text_position: text_position,
            text_rotation: text_rotation,
            text_scale: text_scale,
            activo: true,
            audio: audio === null ? `uploads/markers/${id}/mixkit-toy-train-whistle-1631.wav` : `uploads/markers/${id}/${audio.originalname}`,
            bucle_audio: bucle_audio === '1' ? true : false,
        });
        console.log('Marcador creado:', marker);
        req.flash('notice', 'Marcador creado correctamente');
        res.redirect('/markers');
    } catch (err) {
        console.error('Error al crear el marcador:', err);
        req.flash('alert', 'Error al crear el marcador');
        res.redirect('/markers/new');
    }
};

exports.save_pattern = async (req, res) => {
    // console.log(req.body);
    const filePath = `public/uploads/markers/${req.body.id}/${req.body.imageName}.patt`;
    const patternFileString = req.body.patternFileString;
    // console.log(patternFileString);
    fs.writeFile(filePath, patternFileString, function(err) {
        if (err) {
            console.error('Error al guardar el archivo:', err);
            res.status(500).send('Error al guardar el archivo');
        } else {
            console.log('El archivo se ha guardado exitosamente como', filePath);
            res.status(200).send('Archivo guardado correctamente');
        }
    });
};

exports.edit = async (req, res) => {
    alerta = req.flash('alert');
    notice = req.flash('notice');
    if (alerta.length === 0) {
        alerta = null;
    }
    if (notice.length === 0) {
        notice = null;
    }

    const id = req.params.id;
    const marker = await models.markers.findOne({ where: { id: id } });
    res.render(path.join(__dirname, '../public/views/markers/edit'), {marker: marker, notice: notice, alert: alerta});
};

exports.update = async (req, res) => {
    const { id, preset, position, rotation, scale, model_position, model_rotation, model_scale, anim_conf, bucle_audio, text_data, text_color, text_position, text_rotation, text_scale, activo } = req.body;
    console.log(req.body); 
    console.log(req.files); 
    var patt = null;
    var glb = null;
    var audio = null;

    // Recorrer las claves (propiedades) de req.files
    // if (req.files !== undefined) {
        Object.keys(req.files).forEach(function(key) {
            // Obtener el nombre del campo y la información del archivo
            var fieldName = req.files[key][0].fieldname;
            var path = req.files[key][0].path;
            
            // Guardar los datos según el nombre del campo
            if (fieldName === 'file') {
                // Obtener el originalname sin extension en una variable llamada nombre y la extension en una variable llamada extension
                var originalname = req.files[key][0].originalname;
                const lastDotIndex = originalname.lastIndexOf(".");
                const nombreArchivo = originalname.substring(0, lastDotIndex);

                patt = {
                    originalname: `${nombreArchivo}.patt`,
                    path: path
                };
            } else if (fieldName === 'glb') {
                glb = {
                    originalname: req.files[key][0].originalname,
                    path: path
                };
            } else if (fieldName === 'audio') {
                audio = {
                    originalname: req.files[key][0].originalname,
                    path: path
                };
            }
        });
    // }
    

    // Actualizar el marcador
    try {
        const marcador = await models.markers.findOne({ where: { id: id } });
        if (marcador){
            // Eliminar los archivos antiguos
            if (patt !== null) {
                fs.unlink(`public/${marcador.patt}`, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo:', err);
                    } else {
                        console.log('Archivo eliminado:', marcador.patt);
                    }
                });
            }
            if (glb !== null) {
                fs.unlink(`public/${marcador.src}`, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo:', err);
                    } else {
                        console.log('Archivo eliminado:', marcador.src);
                    }
                });
            }
            if (audio !== null) {
                fs.unlink(`public/${marcador.audio}`, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo:', err);
                    } else {
                        console.log('Archivo eliminado:', marcador.audio);
                    }
                });
            }
            // Imprimir los datos guardados por separado
            console.log("Patt:", patt);
            console.log(patt === null ? marcador.patt : `uploads/markers/${id}/${patt.originalname}`);
            console.log("glb:", glb);
            console.log(glb === null ? marcador.src : `uploads/markers/${id}/${glb.originalname}`);
            console.log("Audio:", audio);
            console.log(audio === null ? marcador.audio : `uploads/markers/${id}/${audio.originalname}`);

            await marcador.update({
                preset: preset,
                patt: patt === null ? marcador.patt : `uploads/markers/${id}/${patt.originalname}`,
                marker_position: position,
                marker_rotation: rotation,
                marker_scale: scale,
                src: glb === null ? marcador.src : `uploads/markers/${id}/${glb.originalname}`,
                model_position: model_position,
                model_rotation: model_rotation,
                model_scale: model_scale,
                anim_conf: anim_conf,
                text_data: text_data,
                text_color: text_color,
                text_position: text_position,
                text_rotation: text_rotation,
                text_scale: text_scale,
                activo: (activo === '1' || activo === 'true') ? true : false,
                audio: audio === null ? marcador.audio : `uploads/markers/${id}/${audio.originalname}`,
                bucle_audio: (bucle_audio === '1' || bucle_audio === 'true') ? true : false,
            });
            console.log('Marcador actualizado:', marcador);
            req.flash('notice', 'Marcador actualizado correctamente');
            res.redirect('/markers');
        }
    }
    catch (err) {
        console.error('Error al actualizar el marcador:', err);
        req.flash('alert', 'Error al actualizar el marcador');
        res.redirect(`/markers/edit/${id}`);
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    await models.markers.destroy({
        where: {
            id: id
        }
    }).then(() => {
        // eliminar la carpeta y todo el cotnenido dentro de ella que sea del id actual
        const dir = `public/uploads/markers/${id}`;
        fs.rmdirSync(dir, { recursive: true });

        console.log('Marcador eliminado');
        req.flash('notice', 'Marcador eliminado correctamente');
        res.redirect('/markers');
    }).catch(err => {
        console.error('Error al eliminar el marcador:', err);
        req.flash('alert', 'Error al eliminar el marcador');
        res.redirect('/markers');
    });
};