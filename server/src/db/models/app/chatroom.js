'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.stakeholders.User, {
        foreignKey: 'creator'
      })
      this.belongsTo(models.app.Message, {
        foreignKey: 'lastMessage'
      })
      this.belongsToMany(models.stakeholders.User, {
        foreignKey: 'chatRoomId', through: models.app.UserChatRoom
      })
      this.hasMany(models.app.UserChatRoom, {
        foreignKey: 'chatRoomId'
      })
    }
  };
  ChatRoom.init({
    creator: DataTypes.INTEGER,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    lastMessage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};