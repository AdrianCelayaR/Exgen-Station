const models = require("../models");
const path = require('path');

exports.getAll = async (req, res) => {
    alerta = req.flash('alert');
    notice = req.flash('notice');
    if (alerta.length === 0) {
        alerta = null;
    }
    if (notice.length === 0) {
        notice = null;
    }
    await models.recompensas.findAll().then(recompensas => {
        res.render(path.join(__dirname, '../public/views/recompensas/index'), {recompensas: recompensas, notice: notice, alert: alerta});
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

    res.render(path.join(__dirname, '../public/views/recompensas/new'), {notice: notice, alert: alerta});
    // res.sendFile(path.join(__dirname, '../public/views/Users/new.html'));
}

exports.create = async (req, res) => {
    console.log(req.body);
    const { recompensa, tipo, descripcion, cantidad_experiencias } = req.body;
    await models.recompensas.create({
        recompensa: recompensa,
        tipo: tipo,
        descripcion: descripcion,
        cantidad_experiencias: cantidad_experiencias
    }).then(recompensa => {
        req.flash('notice', 'Recompensa creada correctamente');
        res.redirect('/recompensas');
    }).catch(err => {
        req.flash('alert', 'Error al crear recompensa');
        res.redirect('/recompensas/new');
    });
}

exports.edit = async (req, res) => {
    alerta = req.flash('alert');
    notice = req.flash('notice');
    if (alerta.length === 0) {
        alerta = null;
    }
    if (notice.length === 0) {
        notice = null;
    }

    const { id } = req.params;
    await models.recompensas.findOne({
        where: {
            id: id
        }
    }).then(recompensa => {
        res.render(path.join(__dirname, '../public/views/recompensas/edit'), {notice: notice, alert: alerta, recompensa: recompensa});
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.update = async (req, res) => {
    console.log(req.body);
    const { id, recomp, tipo, descripcion, cantidad_experiencias } = req.body;
    await models.recompensas.findOne({
        where: {
            id: id
        }
    }).then(recompensa => {
        recompensa.update({
            recompensa: recomp,
            tipo: tipo,
            descripcion: descripcion,
            cantidad_experiencias: cantidad_experiencias
        }).then(recompensa => {
            req.flash('notice', 'Recompensa actualizada correctamente');
            res.redirect('/recompensas');
        }).catch(err => {
            req.flash('alert', 'Error al actualizar recompensa');
            res.redirect('/recompensas/edit/' + id);
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.delete = async (req, res) => {
    const { id } = req.params;
    await models.recompensas.findOne({
        where: {
            id: id
        }
    }).then(recompensa => {
        recompensa.destroy().then(recompensa => {
            req.flash('notice', 'Recompensa eliminada correctamente');
            res.redirect('/recompensas');
        }).catch(err => {
            req.flash('alert', 'Error al eliminar recompensa');
            res.redirect('/recompensas');
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}