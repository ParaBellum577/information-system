'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sprint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.app.Task, {
      //   foreignKey: 'sprintId', through: models.app.SprintTask
      // })
      // this.hasMany(models.app.SprintTask, {
      //   foreignKey: 'sprintId'
      // })
    }
  };
  Sprint.init({
    sprintName: DataTypes.STRING,
    projectId: DataTypes.STRING,
    creator: DataTypes.INTEGER,
    isActive: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    },
    dateStart: DataTypes.DATE,
    dateFinish: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Sprint',
  });
  return Sprint;
};