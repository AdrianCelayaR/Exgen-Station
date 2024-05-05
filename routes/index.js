var express = require('express');
const models = require("../models");
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const cookieJWT = req.cookies["jwt"];
  if (!cookieJWT) {
    return res.render(path.join(__dirname, '../public/views/index'), { title: 'Exgen Station', current_user: null });
  }
  
  const decoded = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
  const current_user = await models.users.findOne({
      where: {
          id: decoded.id
      }
  });
  res.render(path.join(__dirname, '../public/views/index'), { title: 'Exgen Station' , current_user: current_user});
});

router.get('/about', function(req, res, next) {
  res.render(path.join(__dirname, '../public/views/about'), { title: 'Exgen Station' });
});

router.get('/contact', function(req, res, next) {
  res.render(path.join(__dirname, '../public/views/contact'), { title: 'Exgen Station' });
});

router.get('/arcam', async function(req, res, next) {
  const markersAndModels = await models.markers.findAll({
    where: {
      activo: true
    }
  });

  // const markersAndModels = [
  //   {
  //     marker: {
  //       preset: "Poke",
  //       patt: "assets/patterns/pattern-pokebal.patt",
  //       position: "0 0 0",
  //       rotation: "0 0 0",
  //       scale: "1 1 1",
  //     },
  //     model: {
  //       src: "assets/models/pokeballDUO.glb",
  //       position: "0 0 0",
  //       rotation: "0 270 90",
  //       scale: ".25 .25 .25",
  //       animConf: "loop:repeat",
  //     },
  //     text:{
  //       data:"Has Encontrado 2 Pokeballs!!",
  //       color:"pink",
  //       position:"-1 0 1",
  //       rotation:"250 0 0",
  //       scale:"0.75 0.75 0.75"
  //     }
  //   },
  //   {
  //     marker: {
  //       preset: "Bird",
  //       patt: 'assets/patterns/pattern-Pajaro.patt',
  //       position: "0 0 0",
  //       scale: "1 1 1",
  //       rotation: "0 0 0",
  //     },
  //     model: {
  //       src: 'assets/models/birds.glb',
  //       position: "0 0 0",
  //       scale: ".25 .25 .25",
  //       rotation: "0 0 0",
  //       animConf: "loop:repeat",
  //     },
  //     text:{
  //       data:"Hola Pollitos",
  //       color:"green",
  //       position:"-.5 0 1",
  //       rotation:"250 0 0",
  //       scale:"0.75 0.75 0.75"
  //     }
  //   },
  // ];
  res.render(path.join(__dirname, '../public/views/ar'), { 
    title: 'Exgen Station',
    markersAndModels: markersAndModels
  });
});
module.exports = router;
