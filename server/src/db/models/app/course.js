'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.app.Equipment, {
        foreignKey: 'courseId', through: models.app.CourseEquipment
      })
      this.hasMany(models.app.CourseEquipment, {
        foreignKey: 'courseId'
      })

      this.hasMany(models.app.CourseUser, {
        foreignKey: 'courseId'
      })
    }
  };
  Course.init({
    courseName: DataTypes.STRING,
    durationInHours: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};