'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'Adrian Celaya',
        userName: 'AdrianC',
        email: "a1159367@uabc.edu.mx",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Axel Vega',
        userName: 'AxelV',
        email: "axel@uabc.edu.mx",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Alex Cazares',
        userName: 'AlexC',
        email: "alexc@uabc.edu.mx",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'HaiFeng Yu',
        userName: 'HaiFeng',
        email: "haifeng@uabc.edu.mx",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Jordan Payta',
        userName: 'JordanP',
        email: "jordanp@uabc.edu.mx",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Rene Rodriguez',
        userName: 'ReneR',
        email: "reney@uabc.edu.mx",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Yahir Villareal',
        userName: 'YahirV',
        email: "yahirv@uabc.edu.mx",
        password: "123456",
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