const models = require("../models");
const path = require('path');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');

dotenv.config();

exports.loginView = async (req, res) => {
    alerta = req.flash('alert');
    notice = req.flash('notice');
    if (alerta.length === 0) {
        alerta = null;
    }
    if (notice.length === 0) {
        notice = null;
    }
    res.render(path.join(__dirname, '../public/views/login'), { title: 'Login / Exgen Station', alert: alerta, notice: notice });
}

exports.registerView = async (req, res) => {
    alerta = req.flash('alert');
    notice = req.flash('notice');
    if (alerta.length === 0) {
        alerta = null;
    }
    if (notice.length === 0) {
        notice = null;
    }
    res.render(path.join(__dirname, '../public/views/register'), { title: 'Registrar / Exgen Station', alert: alerta, notice: notice});
}

// exports.register = async (req, res) => {
//     console.log(req.body);
//     // res.send("Register");
//     const { fullName, userName, email, password, passwordConfirm } = req.body;
//     if (password === passwordConfirm) {
//         await models.users.findOne({
//             where: {
//                 email: email
//             }
//         }).then(user => {
//             if (user) {
//                 // res.status(400).send({status: "Error", alert: "El correo ya se encuentra registrado", redirect: "/auth/register"});
//                 res.render(path.join(__dirname, '../public/views/register'), { title: 'Registrar / Exgen Station', alert: "El correo ya se encuentra registrado" });
//             } else {
//                 const salt = bcryptjs.genSalt(5);
//                 const hashPassword = bcryptjs.hash(password, salt);
//                 console.log(hashPassword);
//                 // models.users.create({
//                 //     fullName: fullName,
//                 //     userName: userName,
//                 //     email: email,
//                 //     password: hashPassword
//                 // }).then(user => {
//                 //     res.render(path.join(__dirname, '../public/views/login'), { title: 'Login / Exgen Station', notice: "Usuario registrado correctamente" });
//                 // }).catch(err => {
//                 //     res.render(path.join(__dirname, '../public/views/register'), { title: 'Login / Exgen Station', alert: err.message });
//                 //     // res.status(500).send({ alert: err.message });
//                 // });
//             }
//         }).catch(err => {
//             res.render(path.join(__dirname, '../public/views/register'), { title: 'Login / Exgen Station', alert: err.message });
//             // res.status(500).send({ alert: err.message });
//         });
//     } else {
//         res.render(path.join(__dirname, '../public/views/register'), { title: 'Registrar / Exgen Station', alert: "Las contraseñas no coinciden" });
//     }
// }

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await models.users.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        const passwordIsValid = await bcryptjs.compare(password, user.password);
        if (passwordIsValid) {
            const token = jsonwebtoken.sign(
                {id: user.id},
                process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRATION}
            );
            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
                ),
                path: '/',
            };
            res.cookie('jwt', token, cookieOptions);
            req.flash('notice', 'Autenticado correctamente');
            res.redirect('/users');
        } else {
            req.flash('alert', 'Error al iniciar sesión');
            res.redirect('/auth/login');
        }
    } else {
        req.flash('alert', 'El correo no se encuentra registrado');
        res.redirect('/auth/login');
    }
}

exports.register = async (req, res) => {
    console.log(req.body);
    // res.send("Register");
    const { fullName, userName, email, password, passwordConfirm } = req.body;
    if (password === passwordConfirm) {
        const user = await models.users.findOne({
            where: {
                email: email
            }
        });
        if(user) {
            req.flash('alert', 'El correo ya se encuentra registrado');
            res.redirect('/auth/register');
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
            req.flash('notice', 'Usuario registrado correctamente');
            res.redirect('/auth/login');
            // return res.render(path.join(__dirname, '../public/views/login'), { title: 'Login / Exgen Station', notice: "Usuario registrado correctamente" });
        }).catch(err => {
            req.flash('alert', err.message);
            res.redirect('/auth/register');
            // return res.render(path.join(__dirname, '../public/views/register'), { title: 'Login / Exgen Station', alert: err.message });
            // res.status(500).send({ alert: err.message });
        });
    } else {
        req.flash('alert', 'Las contraseñas no coinciden');
        res.redirect('/auth/register');
        // return res.render(path.join(__dirname, '../public/views/register'), { title: 'Registrar / Exgen Station', alert: "Las contraseñas no coinciden" });
    }
}