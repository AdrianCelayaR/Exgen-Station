'use strict';
module.exports = (sequelize, DataTypes) => {
  const rol =
    sequelize.define('rol', {
        nombre:
        {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        }
    }, {});
    rol.associate = function (models) {
    // associations can be defined here
  };
  return rol;
};