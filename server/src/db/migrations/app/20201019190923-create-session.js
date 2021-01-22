'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      ip: {
        type: Sequelize.CIDR
      },
      os: {
        type: Sequelize.STRING
      },
      browser: {
        type: Sequelize.STRING
      },
      userAgent: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      expiredAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sessions');
  }
};