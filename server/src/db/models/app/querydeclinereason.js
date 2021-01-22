'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QueryDeclineReason extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.StakeholderQuery, {
        foreignKey: "stakeholderQueryId",
      })
    }
  };
  QueryDeclineReason.init({
    stakeholderQueryId: DataTypes.INTEGER,
    reason: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QueryDeclineReason',
  });
  return QueryDeclineReason;
};