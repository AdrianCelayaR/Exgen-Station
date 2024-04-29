'use strict';
module.exports = (sequelize, DataTypes) => {
  const users =
    sequelize.define('users', {
        fullName:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        userName:
        {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        email: 
        {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            isEmail: true
          }
        },
        password: 
        {
          type: DataTypes.STRING,
          allowNull: false
        }
    }, {});
    // Definir las asociaciones aquí
    users.associate = function (models) {
      // Asociación con UserRol
      users.hasMany(models.userrols, {
        foreignKey: 'userId',
      });
    };
  return users;
};