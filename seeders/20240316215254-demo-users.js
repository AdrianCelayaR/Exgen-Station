'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'Administrador',
        userName: 'Soporte',
        email: "soporte@uabc.edu.mx",
        password: "$2a$05$9PDuCLRhTfnQoTPVaMKQ.uD8iTLGXiAYWCdWBcD8awRU5J04tHYl2", //Admin1234
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {
      validate: true,
      ignoreDuplicates: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {},
      {});
  }
};