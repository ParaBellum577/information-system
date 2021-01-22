'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EquipmentReserve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  EquipmentReserve.init({
    equipmentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    isCompleted: DataTypes.INTEGER,
    dateFrom: DataTypes.DATE,
    dateTo: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'EquipmentReserve',
  });
  return EquipmentReserve;
};