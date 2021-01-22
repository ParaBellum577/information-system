'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseEquipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Course, {
        foreignKey: 'courseId',
      })
      // this.belongsTo(models.app.Equipment, {
      //   foreignKey: 'equipmentId',
      // })
    }
  };
  CourseEquipment.init({
    courseId: DataTypes.INTEGER,
    equipmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CourseEquipment',
  });
  return CourseEquipment;
};