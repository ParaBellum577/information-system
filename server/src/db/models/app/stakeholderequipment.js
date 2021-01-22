'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StakeholderEquipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.StakeholderQuery, {
        foreignKey: 'stakeholderQueryId'
      })
      this.belongsTo(models.app.Equipment, {
        foreignKey: 'equipmentId'
      })
    }
  };
  StakeholderEquipment.init({
    stakeholderQueryId: DataTypes.INTEGER,
    equipmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StakeholderEquipment',
  });
  return StakeholderEquipment;
};