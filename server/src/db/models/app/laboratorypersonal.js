'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LaboratoryPersonal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Laboratory, {
        foreignKey: 'laboratoryId',
      })
    }
  };
  LaboratoryPersonal.init({
    laboratoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LaboratoryPersonal',
  });
  return LaboratoryPersonal;
};