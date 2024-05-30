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

      users.belongsToMany(models.recompensas, {
        through: 'recompensaUsuarios', // Este es el modelo de tabla intermedia
        foreignKey: 'userId', // Clave foránea en recompensaUsuarios que se refiere a users
        otherKey: 'recompensaId' // Clave foránea en recompensaUsuarios que se refiere a recompensas
      });

      users.belongsToMany(models.markers, {
        through: 'progresoUsuariomMarcadores', // Este es el modelo de tabla intermedia
        foreignKey: 'userId', // Clave foránea en recompensaUsuarios que se refiere a users
      });
    };
  return users;
};