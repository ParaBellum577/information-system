"use strict"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StakeholderContacts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      stakeholderQueryId: {
        type: Sequelize.INTEGER,
       // allowNull: false,
      },
      companyRepresentativeName: {
        type: Sequelize.STRING,
    //    allowNull: false,
      },
      companyRepresentativePosition: {
        type: Sequelize.STRING,
    //    allowNull: false,
      },
      companyName: {
        type: Sequelize.STRING,
    //    allowNull: false,
      },
      personType: Sequelize.STRING,
      legalForm: Sequelize.STRING,
      size: Sequelize.STRING,
      numberOfPreviouslyProducts: Sequelize.INTEGER,
      //address: Sequelize.STRING,
      phone: {
        type: Sequelize.STRING,
  //      allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
     //   allowNull: false,
      },
      twitter: {
        type: Sequelize.STRING,
      },
      instagram: {
        type: Sequelize.STRING,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      telegram: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("StakeholderContacts")
  },
}