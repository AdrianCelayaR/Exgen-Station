'use strict';
module.exports = (sequelize, DataTypes) => {
  const recompensas =
    sequelize.define('recompensas', {
      recompensa:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      descripcion:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      tipo:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      nivel:
      {
        type: DataTypes.STRING,
        allowNull: true
      },
      cantidad_experiencias:
      {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    }, {});
    // Definir las asociaciones aquí
    recompensas.associate = function (models) {
      recompensas.belongsToMany(models.users, {
        through: 'recompensaUsuarios', // Este es el modelo de tabla intermedia
        foreignKey: 'recompensaId', // Clave foránea en recompensaUsuarios que se refiere a recompensas
        otherKey: 'userId' // Clave foránea en recompensaUsuarios que se refiere a users
      });
    };
  return recompensas;
};