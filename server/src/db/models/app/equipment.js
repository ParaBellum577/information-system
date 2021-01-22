'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Laboratory, {
        foreignKey: 'laboratoryId'
      })

      this.hasMany(models.app.EquipmentCharacteristic, {
        foreignKey: 'equipmentId'
      })

      this.belongsToMany(models.app.Course, {
        foreignKey: 'equipmentId', through: models.app.CourseEquipment
      })
      this.hasMany(models.app.CourseEquipment, {
        foreignKey: 'equipmentId'
      })

    }
  };
  Equipment.init({
    equipmentName: DataTypes.STRING,
    equipmentDescription: DataTypes.STRING,
    equipmentPic: DataTypes.STRING,
    laboratoryId: DataTypes.INTEGER,
    //isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Equipment',
  });
  return Equipment;
};