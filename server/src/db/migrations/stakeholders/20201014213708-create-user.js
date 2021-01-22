const path = require("path")
const normalize = require("normalize-path")
"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      patronymic: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.INTEGER,
      },
      monthOfBirth: {
        type: Sequelize.INTEGER,
      },
      yearOfBirth: {
        type: Sequelize.INTEGER,
      },
      nationality: {
        type: Sequelize.STRING,
      },
      countryOfResidence: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      sourceOfKnowledgeAboutTheLab: {
        type: Sequelize.STRING,
      },
      purposeOfWorkInLab: {
        type: Sequelize.STRING,
      },
      emailConfirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
      },
      userConfirm: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      goIsidMember: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      avatar: {
        type: Sequelize.STRING,
        defaultValue: normalize(path.join(__dirname, "../../avatars/no-avatar.png")),
      },
      lastSeen: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
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
    await queryInterface.dropTable("Users")
  },
}