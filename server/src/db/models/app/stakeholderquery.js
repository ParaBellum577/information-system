'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StakeholderQuery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.app.Product, {
        foreignKey: 'stakeholderQueryId'
      })
      this.belongsTo(models.app.StakeholderQueryStatus, {
        foreignKey: "stakeholderQueryStatusId",
      })
      this.hasMany(models.app.StakeholderInterest, {
        foreignKey: 'stakeholderQueryId'
      })
      this.hasMany(models.app.TargetGroup, {
        foreignKey: 'stakeholderQueryId'
      })
      this.hasMany(models.app.StakeholderEquipment, {
        foreignKey: 'stakeholderQueryId'
      })
      this.hasOne(models.app.StakeholderContact, {
        foreignKey: 'stakeholderQueryId'
      })
      this.hasOne(models.app.QueryDeclineReason, {
        foreignKey: "stakeholderQueryId",
      })
      // this.hasOne(models.Project, {
      //   foreignKey: 'stakeholderId'
      // })
    }
  };
  StakeholderQuery.init({
    userId: DataTypes.INTEGER,
    projectName: DataTypes.STRING,
    projectArea: DataTypes.STRING,
    dateFrom: DataTypes.DATEONLY,
    dateTo: DataTypes.DATEONLY,
    projectGoals: DataTypes.STRING,
    declaration: DataTypes.STRING,
    stakeholderQueryStatusId: DataTypes.INTEGER,

    //isConfirmed: DataTypes.BOOLEAN

  }, {
    sequelize,
  //  schema: "public",
    modelName: 'StakeholderQuery',
  });
  return StakeholderQuery;
};