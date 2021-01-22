'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.stakeholders.User, {
      //   foreignKey: "teamId", through: models.app.TeamUser
      // })
      this.hasMany(models.app.TeamUser, {
        foreignKey: "teamId"
      })
    }
  };
  Team.init({
    teamName: DataTypes.STRING,
    creator: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: "Team",
  });
  return Team;
};