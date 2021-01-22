"use strict"
const {
  Model,
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class EquipmentCharacteristic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Equipment, {
        foreignKey: "equipmentId",
      })
    }
  }

  EquipmentCharacteristic.init({
    equipmentId: DataTypes.INTEGER,
    characteristicName: DataTypes.STRING,
    characteristicUnit: DataTypes.STRING,
    characteristicValue: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "EquipmentCharacteristic",
  })
  return EquipmentCharacteristic
}