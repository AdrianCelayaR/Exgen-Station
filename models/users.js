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
    users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};