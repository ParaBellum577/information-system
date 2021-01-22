'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TargetGroup extends Model {
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
  TargetGroup.init({
    targetGroupName: DataTypes.STRING,
    stakeholderQueryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TargetGroup',
  });
  return TargetGroup;
};