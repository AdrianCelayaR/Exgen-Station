'use strict';
module.exports = (sequelize, DataTypes) => {
  const userrols = sequelize.define('userrols', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});

  // Define las asociaciones aquí
  userrols.associate = function(models) {
    // Asociación con el modelo User
    userrols.belongsTo(models.users, {
      foreignKey: 'userId',
    });

    // Asociación con el modelo Rol
    userrols.belongsTo(models.rols, {
      foreignKey: 'roleId',
    });
  };

  return userrols;
};