'use strict';
module.exports = (sequelize, DataTypes) => {
  const rols =
    sequelize.define('rols', {
        nombre:
        {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        }
    }, {});
    // Definir las asociaciones aquí
    rols.associate = function (models) {
      // Asociación con UserRol
      rols.hasMany(models.userrols, {
        foreignKey: 'roleId',
      });
    };
  return rols;
};