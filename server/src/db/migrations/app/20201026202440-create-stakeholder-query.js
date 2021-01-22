"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StakeholderQueries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
       // allowNull: false,
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectArea: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateFrom: {
        type: Sequelize.DATEONLY,
    //    allowNull: false,
      },
      dateTo: {
        type: Sequelize.DATEONLY,
    //    allowNull: false,
      },
      projectGoals: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      declaration: Sequelize.STRING,
      stakeholderQueryStatusId: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("StakeholderQueries")
  },
}