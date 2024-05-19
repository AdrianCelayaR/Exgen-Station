'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recompensas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recompensa: {
        allowNull: true,
        type: Sequelize.STRING
      },
      descripcion: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tipo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      nivel: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cantidad_experiencias: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recompensas');
  }
};