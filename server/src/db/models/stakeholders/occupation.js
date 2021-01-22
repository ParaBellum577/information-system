'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Occupation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.stakeholders.User, {
        foreignKey: 'userId'
      })
    }
  };
  Occupation.init({
    userId: DataTypes.INTEGER,
    occupationName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Occupation',
  });
  return Occupation;
};