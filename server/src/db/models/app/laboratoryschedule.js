'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LaboratorySchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Laboratory, {
        foreignKey: 'laboratoryId',
      })
      this.belongsTo(models.app.DaysForSchedule, {
        foreignKey: 'dayId'
      })
    }
  };
  LaboratorySchedule.init({
    laboratoryId: DataTypes.INTEGER,
    dayId: DataTypes.INTEGER,
    workDayStart: DataTypes.TIME,
    workDayEnd: DataTypes.TIME,
    dayOff: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'LaboratorySchedule',
  });
  return LaboratorySchedule;
};