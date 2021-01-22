"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CardDocuments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      docId: {
        autoIncrement: true
        type: Sequelize.INTEGER,
      },
      index: {
        type: Sequelize.STRING,
      },
      version: {
        type: Sequelize.INTEGER,
      },
      current: {
        type: Sequelize.BOOLEAN,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      orderTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      documentComposition: {
        type: Sequelize.TEXT,
      },
      accessGroups: {
        type: Sequelize.ARRAY,
      },
      nameDocument: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      statusDocumentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      expirationDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      exitDate: {
        type: Sequelize.DATE,
      },
      authorVersion: {
        type: Sequelize.STRING,
      },
      initiatorClosingDocument: {
        allowNull: false
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CardDocuments")
  }
}