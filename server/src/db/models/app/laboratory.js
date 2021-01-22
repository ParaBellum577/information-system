'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Laboratory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.app.LaboratoryPersonal, {
        foreignKey: 'laboratoryId'
      })
      this.hasMany(models.app.Equipment, {
        foreignKey: 'laboratoryId'
      })

      this.belongsToMany(models.app.DaysForSchedule, {
        foreignKey: 'laboratoryId', through: models.app.LaboratorySchedule
      })
      this.hasMany(models.app.LaboratorySchedule, {
        foreignKey: 'laboratoryId'
      })
    }
  };
  Laboratory.init({
    laboratoryName: DataTypes.STRING,
    administrator: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN,
    workDayStart: DataTypes.TIME,
    workDayEnd: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Laboratory',
  });
  return Laboratory;
};