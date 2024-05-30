'use strict';
module.exports = (sequelize, DataTypes) => {
  const progresoUsuariomMarcadores = sequelize.define('progresoUsuariomMarcadores', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    markerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {});

  // Define las asociaciones aquí
  progresoUsuariomMarcadores.associate = function(models) {
    // Asociación con el modelo User
    progresoUsuariomMarcadores.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user'
    });

    // Asociación con el modelo markers
    progresoUsuariomMarcadores.belongsTo(models.markers, {
      foreignKey: 'markerId',
      as: 'marker'
    });
  };

  return progresoUsuariomMarcadores;
};