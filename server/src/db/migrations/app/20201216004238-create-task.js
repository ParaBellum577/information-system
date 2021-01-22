'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      sprintId: {
        type: Sequelize.INTEGER
      },
      priorityId: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      creator: {
        type: Sequelize.INTEGER
      },
      executor: {
        type: Sequelize.INTEGER
      },
      taskName: {
        type: Sequelize.STRING
      },
      taskText: {
        type: Sequelize.STRING
      },
      dateStartPlanned: {
        type: Sequelize.DATE
      },
      dateFinishPlanned: {
        type: Sequelize.DATE
      },
      dateStart: {
        type: Sequelize.DATE
      },
      dateFinish: {
        type: Sequelize.DATE
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      taskStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 1
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
    await queryInterface.dropTable('Tasks');
  }
};