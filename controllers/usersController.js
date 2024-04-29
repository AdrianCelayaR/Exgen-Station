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
    roles = await models.rols.findAll();
    await models.users.findAll({include: models.userrols}).then(users => {
        res.render(path.join(__dirname, '../public/views/Users/index'), { users: users, roles: roles, notice: notice, alert: alerta});
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
    roles = await models.rols.findAll();
    res.render(path.join(__dirname, '../public/views/Users/new'), {roles: roles, notice: notice, alert: alerta });
    // res.sendFile(path.join(__dirname, '../public/views/Users/new.html'));
}

exports.create = async (req, res) => {
    console.log(req.body);
    // res.send("Register");
    const { fullName, userName, email, password, passwordConfirm, rol } = req.body;
    if (password === passwordConfirm) {
        const user = await models.users.findOne({
            where: {
                email: email
            }
        });
        if(user) {
            req.flash('alert', 'El correo ya se encuentra registrado');
            res.redirect('/users/new');
            // return res.render(path.join(__dirname, '../public/views/register'), { title: 'Registrar / Exgen Station', alert: "El correo ya se encuentra registrado" });
        }
        const salt = await bcryptjs.genSaltSync(5);
        const hashPassword = await bcryptjs.hashSync(password, salt);
        await models.users.create({
            fullName: fullName,
            userName: userName,
            email: email,
            password: hashPassword
        }).then(user => {
            models.userrols.create({
                userId: user.id,
                roleId: parseInt(rol)
            }).then(userrol => {
                req.flash('notice', 'Usuario registrado correctamente');
                res.redirect('/users');
            }).catch(err => {
                req.flash('alert', err.message);
                res.redirect('/users/new');
            });
            // return res.render(path.join(__dirname, '../public/views/login'), { title: 'Login / Exgen Station', notice: "Usuario registrado correctamente" });
        }).catch(err => {
            req.flash('alert', err.message);
            res.redirect('/users/new');
            // return res.render(path.join(__dirname, '../public/views/register'), { title: 'Login / Exgen Station', alert: err.message });
            // res.status(500).send({ alert: err.message });
        });
    } else {
        req.flash('alert', 'Las contraseñas no coinciden');
        res.redirect('/users/new');
        // return res.render(path.join(__dirname, '../public/views/register'), { title: 'Registrar / Exgen Station', alert: "Las contraseñas no coinciden" });
    }
}


exports.edit = async (req, res) => {
    const id = req.params.id;
    alerta = req.flash('alert');
    notice = req.flash('notice');
    if (alerta.length === 0) {
        alerta = null;
    }
    if (notice.length === 0) {
        notice = null;
    }
    roles = await models.rols.findAll();
    rol_actual = await models.userrols.findOne({
        where: {
            userId: id
        }
    });

    if (rol_actual === null) {
        rol_actual = {
            roleId: 0
        }
    }
    console.log(rol_actual.roleId);
    await models.users.findByPk(id).then(user => {
        res.render(path.join(__dirname, '../public/views/Users/edit'), {user: user, roles: roles, rol_actual_id: rol_actual.roleId, notice: notice, alert: alerta });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.update = async (req, res) => {
    const { id, fullName, userName, email, rol } = req.body;

    try {
        const user = await models.users.findOne({
            where: {
                email: email
            }
        });

        if (user) {
            await user.update({
                fullName: fullName,
                userName: userName,
                email: email
            });

            const existingUserRol = await models.userrols.findOne({
                where: {
                    userId: user.id
                }
            });

            if (existingUserRol) {
                await existingUserRol.update({
                    roleId: parseInt(rol)
                });
                console.log('Rol actualizado para el usuario:', user.email);
            } else {
                await models.userrols.create({
                    userId: user.id,
                    roleId: parseInt(rol)
                });
                console.log('Nuevo rol creado para el usuario:', user.email);
            }

            req.flash('notice', 'Usuario actualizado correctamente');
            res.redirect('/users');
        } else {
            req.flash('alert', 'Usuario no encontrado');
            res.redirect(`/users/edit/${id}`);
        }
    } catch (error) {
        req.flash('alert', error.message);
        res.redirect(`/users/edit/${id}`);
    }
};


exports.delete = async (req, res) => {
    const id = req.params.id;
    await models.userrols.destroy({
        where: {
            userId: id
        }
    }).then(() => {
        console.log('UserRol eliminado');
        // models.users.destroy({
        //     where: {
        //         id: id
        //     }
        // }).then(() => {
        //     req.flash('notice', 'Usuario eliminado correctamente');
        //     res.redirect('/users');
        // }).catch(err => {
        //     req.flash('alert', err.message);
        //     res.redirect('/users');
        // });
    }).catch(err => {
        req.flash('alert', err.message);
        res.redirect('/users');
    });
    await models.users.destroy({
        where: {
            id: id
        }
    }).then(() => {
        req.flash('notice', 'Usuario eliminado correctamente');
        res.redirect('/users');
    }).catch(err => {
        req.flash('alert', err.message);
        res.redirect('/users');
    });
}