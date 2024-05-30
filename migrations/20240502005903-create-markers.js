'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('markers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      preset: {
        allowNull: true,
        type: Sequelize.STRING
      },
      patt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      marker_position: {
        allowNull: true,
        type: Sequelize.STRING
      },
      marker_rotation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      marker_scale: {
        allowNull: true,
        type: Sequelize.STRING
      },
      src: {
        allowNull: true,
        type: Sequelize.STRING
      },
      model_position: {
        allowNull: true,
        type: Sequelize.STRING
      },
      model_rotation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      model_scale: {
        allowNull: true,
        type: Sequelize.STRING
      },
      anim_conf: {
        allowNull: true,
        type: Sequelize.STRING
      },
      text_data: {
        allowNull: true,
        type: Sequelize.STRING
      },
      text_color: {
        allowNull: true,
        type: Sequelize.STRING
      },
      text_position: {
        allowNull: true,
        type: Sequelize.STRING
      },
      text_rotation: {
        allowNull: true,
        type: Sequelize.STRING
      },
      text_scale: {
        allowNull: true,
        type: Sequelize.STRING
      },
      activo:{
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN
      },
      audio: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bucle_audio: {
        allowNull: true,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('markers');
  }
};