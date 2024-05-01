const models = require("../models");
const path = require('path');
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
    // await models.users.findAll({include: models.userrols}).then(users => {
        res.render(path.join(__dirname, '../public/views/markerGenerator/index'), { notice: notice, alert: alerta});
        // res.sendFile(path.join(__dirname, '../public/views/Users/index.html'), { users: users });
    // }).catch(err => {
    //     res.status(500).send({ message: err.message });
    // });
};