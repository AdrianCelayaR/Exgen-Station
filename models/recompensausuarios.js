'use strict';
module.exports = (sequelize, DataTypes) => {
  const recompensaUsuarios = sequelize.define('recompensaUsuarios', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    recompensaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reclamada: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {});

  // Define las asociaciones aquí
  recompensaUsuarios.associate = function(models) {
    // Asociación con el modelo User
    recompensaUsuarios.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user'
    });

    // Asociación con el modelo Rol
    recompensaUsuarios.belongsTo(models.recompensas, {
      foreignKey: 'recompensaId',
      as: 'recompensa'
    });
  };

  return recompensaUsuarios;
};