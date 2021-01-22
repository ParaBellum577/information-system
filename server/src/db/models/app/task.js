'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.TaskStatus, {
        foreignKey: 'taskStatus'
      })

      this.belongsTo(models.app.Sprint, {
        foreignKey: 'sprintId'
      })
    }
  };
  Task.init({
    projectId: DataTypes.INTEGER,
    creator: DataTypes.INTEGER,
    executor: DataTypes.INTEGER,
    taskName: DataTypes.STRING,
    taskText: DataTypes.STRING,
    dateStartPlanned: DataTypes.DATE,
    dateFinishPlanned: DataTypes.DATE,
    dateStart: DataTypes.DATE,
    dateFinish: DataTypes.DATE,
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: true
    },
    taskStatus: DataTypes.INTEGER,
    sprintId: DataTypes.INTEGER,
    priorityId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};