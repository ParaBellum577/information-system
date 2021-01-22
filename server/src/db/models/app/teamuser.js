'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Team, {
        foreignKey: "teamId",
      })
      this.belongsTo(models.stakeholders.User, {
        foreignKey: "userId"
      })
    }
  };
  TeamUser.init({
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: "TeamUser",
  });
  return TeamUser;
};