const models = require("../models");
const path = require('path');

exports.getAllUsers = async (req, res) => {
    await models.users.findAll().then(users => {
        alerta = req.flash('alert');
        notice = req.flash('notice');
        if (alerta.length === 0) {
            alerta = null;
        }
        if (notice.length === 0) {
            notice = null;
        }
        res.render(path.join(__dirname, '../public/views/Users/index'), { users: users, notice: notice, alert: alerta});
        // res.sendFile(path.join(__dirname, '../public/views/Users/index.html'), { users: users });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};