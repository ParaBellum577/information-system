"use strict"
const {
  Model,
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class CourseUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Course, {
        foreignKey: "courseId",
      })
      this.belongsToMany(models.app.Equipment, {
        foreignKey: "courseId", through: models.app.CourseEquipment,
      })
      this.hasMany(models.app.CourseEquipment, {
        foreignKey: "courseId",
      })
    }
  }


  CourseUser.init({
    courseId: DataTypes.INTEGER,
    dateStart: DataTypes.DATE,
    dateFinish: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    isCompleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: "CourseUser",
  })
  return CourseUser
}