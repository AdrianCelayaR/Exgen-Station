const models = require("../models");
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');

dotenv.config();

exports.usuarioAutenticado = async (req, res, next) => {
    if (await comprobarCookie(req)) {
        return next();
    }
    return res.redirect('/auth/login');
}

exports.vistaAdmin = async (req, res, next) => {
    const roleCheck = await comprobarCookie(req, [1, 2]);
    if (roleCheck === 1) { // Admin
        return next();
    } else if (roleCheck === 2) { // Diseñador
        return res.redirect('/markers');
    }
    return res.redirect('/');
}

exports.vistaDesigner = async (req, res, next) => {
    if (await comprobarCookie(req, [1, 2])) { // Roles de admin (1) y diseñador (2)
        return next();
    }
    return res.redirect('/');
}

async function comprobarCookie(req, allowedRoles = []) {
    try {
        const cookieJWT = req.cookies["jwt"];
        const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
        const current_user = await models.users.findOne({
            where: {
                id: decoded.id
            }
        });
        if (!current_user) {
            return false;
        }
        const userRoles = await models.userrols.findAll({
            where: {
                userId: current_user.id
            }
        });

        if (!userRoles || userRoles.length === 0) {
            return false;
        }

        // Check if any of the user's roles are in the allowedRoles array
        const hasAllowedRole = userRoles.some(userRole => allowedRoles.includes(userRole.roleId));
        if (!hasAllowedRole) {
            return false;
        }

        // Return the roleId if it's one of the allowedRoles
        const role = userRoles.find(userRole => allowedRoles.includes(userRole.roleId));
        return role ? role.roleId : false;
    } catch (err) {
        console.log(err);
        return false;
    }
}