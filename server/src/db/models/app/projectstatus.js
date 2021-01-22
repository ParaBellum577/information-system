'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.app.Project, {
        foreignKey: 'status'
      })
    }
  };
  ProjectStatus.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectStatus',
  });
  return ProjectStatus;
};