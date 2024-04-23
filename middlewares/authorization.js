const models = require("../models");
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');

dotenv.config();

exports.vistaAdmin = async (req, res, next) => {
    if (await comprobarCookie(req)){
        return next();
    }
    return res.redirect('/');
    // jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET, (err, decoded) => {
    //     if (err) {
    //         res.redirect('/auth/login');
    //     } else {
    //         console.log(decoded);
    //         if (decoded.role === 'admin') {
    //             next();
    //         } else {
    //             res.redirect('/auth/login');
    //         }
    //     }
    // });
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
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}