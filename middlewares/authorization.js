const models = require("../models");
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');

dotenv.config();

exports.usuarioAutenticado = async (req, res, next) => {
    if (await comprobarCookie(req)){
        return next();
    }
    // jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         res.redirect('/auth/login');
    //     } else {
    //         return next();
    //     }
    // });
    return res.redirect('/auth/login');
}

exports.vistaAdmin = async (req, res, next) => {
    if (await comprobarCookie(req)){
        return next();
    }
    // jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         res.redirect('/auth/login');
    //     } else {
    //         console.log(decoded);
    //         if (decoded.role === 'admin') {
    //             return next();
    //         } else {
    //             return res.redirect('/auth/login');
    //         }
    //     }
    // });
    return res.redirect('/');
}

async function comprobarCookie(req) {
    try{
        const cookieJWT = req.cookies["jwt"];
        const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        const current_user = await models.users.findOne({
            where: {
                id: decoded.id
            }
        });
        if(!current_user){
            return false;
        }
        const existingUserRol = await models.userrols.findOne({
            where: {
                userId: current_user.id
            }
        });
        if(!existingUserRol){
            return false;
        }
        if(existingUserRol.roleId !== 1){
            return false;
        }
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}