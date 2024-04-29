'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rols', [
      {
        nombre: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Diseñador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Jugador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {
      validate: true,
      ignoreDuplicates: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rols', {},
      {});
  }
};