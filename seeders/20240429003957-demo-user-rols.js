'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userrols', [
      {
        userId: 1,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {
      validate: true,
      ignoreDuplicates: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userrols', {},
      {});
  }
};