'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Session, {
          foreignKey: 'userId',
      })
    }
  };
  Session.init({
    userId: DataTypes.INTEGER,
    ip: DataTypes.CIDR,
    os: DataTypes.STRING,
    browser: DataTypes.STRING,
    userAgent: DataTypes.STRING,
    token: DataTypes.STRING,
    expiredAt: DataTypes.DATE
  }, {
    sequelize,
    schema:'public',
    modelName: 'Session',
  });
  return Session;
};