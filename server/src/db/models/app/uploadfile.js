'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UploadFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.Message, {
        foreignKey: "messageId",
      })
    }
  };
  UploadFile.init({
    messageId: DataTypes.INTEGER,
    fileName: DataTypes.STRING,
    fileType: DataTypes.STRING,
    fileSize: DataTypes.STRING,
    filePath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UploadFile',
  });
  return UploadFile;
};