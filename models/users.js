'use strict';
module.exports = (sequelize, DataTypes) => {
  const users =
    sequelize.define('users', {
        firstName:
        {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: 
        {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        // password: 
        // {
        //   type: DataTypes.STRING,
        //   allowNull: false
        // }
    }, {});
    users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};