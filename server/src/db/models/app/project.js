'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.StakeholderQuery, {
        foreignKey: "stakeholderId",
      })
      this.belongsTo(models.app.ProjectStatus, {
        foreignKey: 'status'
      })
    }
  };
  Project.init({
    stakeholderId: DataTypes.INTEGER,
    creator: DataTypes.INTEGER,
    dateStart: DataTypes.DATE,
    dateFinish: DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
  //  schema: "public",
    modelName: 'Project',
  });
  return Project;
};