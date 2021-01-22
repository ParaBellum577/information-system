'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StakeholderInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.StakeholderQuery, {
        foreignKey: 'stakeholderQueryId'
      })
    }
  };
  StakeholderInterest.init({
    stakeholderQueryId: DataTypes.INTEGER,
    interestName: DataTypes.STRING,
    isPositive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'StakeholderInterest',
  });
  return StakeholderInterest;
};