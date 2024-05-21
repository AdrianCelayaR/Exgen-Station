var express = require("express");
const models = require("../models");
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const cookieJWT = req.cookies["jwt"];
  if (!cookieJWT) {
    return res.render(path.join(__dirname, "../public/views/index"), {
      title: "Exgen Station",
      current_user: null,
    });
  }

  const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
  const user_rol = await models.userrols.findOne({
    where: {
      userId: decoded.id,
    },
  });
  const current_user = await models.users.findOne({
    include: models.userrols,
    where: {
      id: decoded.id,
    },
  });
  let rol = null;
  // if (user_rol) {
  //   rol = await models.rols.findOne({
  //     where: {
  //       id: user_rol.rolId
  //     }
  //   });
  // }
  if (user_rol.roleId === 1) {
    rol = "admin";
  }

  res.render(path.join(__dirname, "../public/views/index"), {
    title: "Exgen Station",
    current_user: current_user,
    rol: rol,
  });
});

router.get("/about", function (req, res, next) {
  res.render(path.join(__dirname, "../public/views/about"), { title: "Exgen Station" });
});

router.get("/contact", function (req, res, next) {
  res.render(path.join(__dirname, "../public/views/contact"), { title: "Exgen Station" });
});

router.get("/arcam", async function (req, res, next) {
  const markersAndModels = await models.markers.findAll({
    where: {
      activo: true,
    },
  });

  const cookieJWT = req.cookies["jwt"];

  if (!cookieJWT) {
    return res.render(path.join(__dirname, "../public/views/ar"), {
      title: "Exgen Station",
      markersAndModels: markersAndModels,
      currentUser: null,
    });
  }

  const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
  const current_user = await models.users.findOne({
    include: models.userrols,
    where: {
      id: decoded.id,
    },
  });
  // Convertir currentUser a JSON y pasarlo a la plantilla
  const currentUserJSON = JSON.stringify(current_user);
  console.log(currentUserJSON);
  res.render(path.join(__dirname, "../public/views/ar"), {
    title: "Exgen Station",
    markersAndModels: markersAndModels,
    currentUser: current_user,
  });
});
module.exports = router;
