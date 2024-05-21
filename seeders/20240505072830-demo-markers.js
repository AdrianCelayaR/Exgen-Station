"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "markers",
      [
        {
          preset: "Poke",
          patt: "uploads/markers/1/pattern-pokebal.patt",
          marker_position: "0 0 0",
          marker_rotation: "0 0 0",
          marker_scale: "1 1 1",
          src: "uploads/markers/1/pokeballDUO.glb",
          model_position: "0 0 0",
          model_rotation: "0 270 90",
          model_scale: ".25 .25 .25",
          anim_conf: "loop:repeat",
          text_data: "Has Encontrado 2 Pokeballs!!",
          text_color: "red",
          text_position: "-1 0 1",
          text_rotation: "250 0 0",
          text_scale: "0.75 0.75 0.75",
          activo: true,
          audio: "uploads/markers/1/mixkit-toy-train-whistle-1631.wav",
          bucle_audio: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          preset: "Bird",
          patt: "uploads/markers/2/pattern-Pajaro.patt",
          marker_position: "0 0 0",
          marker_rotation: "0 0 0",
          marker_scale: "1 1 1",
          src: "uploads/markers/2/birds.glb",
          model_position: "0 0 0",
          model_rotation: "0 0 0",
          model_scale: ".25 .25 .25",
          anim_conf: "loop:repeat",
          text_data: "Hola Pollitos",
          text_color: "white",
          text_position: "-.5 0 1",
          text_rotation: "250 0 0",
          text_scale: "0.75 0.75 0.75",
          activo: true,
          audio: "uploads/markers/2/mixkit-toy-train-whistle-1631.wav",
          bucle_audio: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        validate: true,
        ignoreDuplicates: true,
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("markers", {}, {});
  },
};
