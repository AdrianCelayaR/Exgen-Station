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
      markers.belongsToMany(models.users, {
        through: 'progresoUsuariomMarcadores', // Este es el modelo de tabla intermedia
        foreignKey: 'markerId', // Clave foránea en recompensaUsuarios que se refiere a markers
        otherKey: 'userId' // Clave foránea en recompensaUsuarios que se refiere a users
      });
    };
  return markers;
};