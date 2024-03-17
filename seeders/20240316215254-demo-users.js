'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'AdrianC',
        email: "a1159367@uabc.edu.mx",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'AxelV',
        email: "axel@uabc.edu.mx",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'AlexC',
        email: "alexc@uabc.edu.mx",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'HaiFeng',
        email: "haifeng@uabc.edu.mx",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'JordanP',
        email: "jordanp@uabc.edu.mx",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'ReneY',
        email: "reney@uabc.edu.mx",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'YahirV',
        email: "yahirv@uabc.edu.mx",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {},
      {});
  }
};