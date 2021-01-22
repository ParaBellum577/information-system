'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpamStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Spam, {
        foreignKey: "statusId",
      })
    }
  };
  SpamStatus.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SpamStatus',
  });
  return SpamStatus;
};