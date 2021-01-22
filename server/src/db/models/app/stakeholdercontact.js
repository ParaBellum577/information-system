'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StakeholderContact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.app.StakeholderQuery, {
      //   foreignKey: 'stakeholderQueryId'
      // })
    }
  };
  StakeholderContact.init({

    companyRepresentativeName: DataTypes.STRING,
    companyRepresentativePosition: DataTypes.STRING,
    companyName: DataTypes.STRING,
    personType: DataTypes.STRING,
    legalForm: DataTypes.STRING,
    size: DataTypes.STRING,
    numberOfPreviouslyProducts: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    stakeholderQueryId: DataTypes.INTEGER,
    twitter: DataTypes.STRING,
    instagram: DataTypes.STRING,
    facebook: DataTypes.STRING,
    telegram: DataTypes.STRING,

  }, {
    sequelize,
   // schema: "public",
    modelName: 'StakeholderContact',
  });
  return StakeholderContact;
};