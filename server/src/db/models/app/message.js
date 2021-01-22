'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.stakeholders.User, {
        foreignKey: 'author'
      })
      this.belongsTo(models.app.ChatRoom, {
        foreignKey: 'chatRoomId'
      })
      this.hasOne(models.app.UploadFile, {
        foreignKey: "messageId",
      })
      // this.hasOne(models.Message, {
      //   foreignKey: 'lastMessage'
      // })
    }
  };
  Message.init({
    chatRoomId: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
    messageText: DataTypes.STRING,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    isRead: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};