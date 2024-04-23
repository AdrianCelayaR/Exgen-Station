var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(path.join(__dirname, '../public/views/index'), { title: 'Exgen Station' });
});

router.get('/about', function(req, res, next) {
  res.render(path.join(__dirname, '../public/views/about'), { title: 'Exgen Station' });
});

router.get('/contact', function(req, res, next) {
  res.render(path.join(__dirname, '../public/views/contact'), { title: 'Exgen Station' });
});

router.get('/arcam', function(req, res, next) {
  const markersAndModels = [
    {
      marker: {
        preset: "Poke",
        patt: "assets/pattterns/pattern-pokebal.patt",
        position: "0 0 0",
        rotation: "0 0 0",
        scale: "1 1 1",
      },
      model: {
        src: "assets/models/pokeballDUO.glb",
        position: "0 0 0",
        rotation: "0 270 90",
        scale: ".25 .25 .25",
        animConf: "loop:repeat",
      },
      text:{
        data:"Has Encontrado 2 Pokeballs!!",
        color:"pink",
        position:"-1 0 1",
        rotation:"250 0 0",
        scale:"0.75 0.75 0.75"
      }
    },
    {
      marker: {
        preset: "Bird",
        patt: 'assets/pattterns/pattern-Pajaro.patt',
        position: "0 0 0",
        scale: "1 1 1",
        rotation: "0 0 0",
      },
      model: {
        src: 'assets/models/birds.glb',
        position: "0 0 0",
        scale: ".25 .25 .25",
        rotation: "0 0 0",
        animConf: "loop:repeat",
      },
      text:{
        data:"Hola Pollitos",
        color:"green",
        position:"-.5 0 1",
        rotation:"250 0 0",
        scale:"0.75 0.75 0.75"
      }
    },
  ];
  res.render(path.join(__dirname, '../public/views/ar'), { 
    title: 'Exgen Station',
    markersAndModels: markersAndModels
  });
});
module.exports = router;
