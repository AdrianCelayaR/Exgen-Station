'use strict';
module.exports = (sequelize, DataTypes) => {
  const markers =
    sequelize.define('markers', {
      preset:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      patt:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      marker_position:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      marker_rotation:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      marker_scale:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      src:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      model_position:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      model_rotation:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      model_scale:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      anim_conf:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      text_data:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      text_color:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      text_position:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      text_rotation:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      text_scale:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      activo:
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      audio:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      bucle_audio:
      {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    }, {});
    // Definir las asociaciones aquí
    markers.associate = function (models) {
      // associations can be defined here
    };
  return markers;
};