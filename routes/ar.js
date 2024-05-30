var express = require('express');
var router = express.Router();
var path = require('path');
const jsonwebtoken = require('jsonwebtoken');

/* GET ar camera page. */
router.get('/', async function(req, res, next) {
    const cookieJWT = req.cookies["jwt"];
    if (!cookieJWT) {
        return res.sendFile(path.join(__dirname, '../public/views/ar.html'));
    }
    
    const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const user_rol = await models.userrols.findOne({
        where: {
        userId: decoded.id
        }
    });
    const current_user = await models.users.findOne({
        include: models.userrols,
        where: {
            id: decoded.id
        }
    });

    const cantidadProgreso = await models.progresoUsuariomMarcadores.count({
        where: { userId: decoded.id }
    });
    // res.sendFile(path.join(__dirname, '../public/views/ar.html'));
    res.render(path.join(__dirname, '../public/views/ar'), { title: 'Exgen Station', current_user: current_user, progreso: cantidadProgreso});
});


module.exports = router;
