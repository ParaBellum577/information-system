'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DaysForSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.app.Laboratory, {
        foreignKey: 'dayId', through: models.app.LaboratorySchedule
      })
      this.hasMany(models.app.LaboratorySchedule, {
        foreignKey: 'dayId'
      })
    }
  };
  DaysForSchedule.init({
    day: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DaysForSchedule',
  });
  return DaysForSchedule;
};