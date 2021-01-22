'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SprintTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Sprint, {
        foreignKey: 'sprintId',
      })
      this.belongsTo(models.app.Task, {
        foreignKey: 'taskId'
      })
    }
  };
  SprintTask.init({
    sprintId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SprintTask',
  });
  return SprintTask;
};