'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LaboratorySchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      laboratoryId: {
        type: Sequelize.INTEGER
      },
      dayId: {
        type: Sequelize.INTEGER
      },
      workDayStart: {
        type: Sequelize.TIME
      },
      workDayEnd: {
        type: Sequelize.TIME
      },
      dayOff: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('LaboratorySchedules');
  }
};