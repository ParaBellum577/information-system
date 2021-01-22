'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.app.ChatRoom, {
        foreignKey: 'chatRoomId',
      })
      this.belongsTo(models.stakeholders.User, {
        foreignKey: 'userId'
      })
    }
  };
  UserChatRoom.init({
    chatRoomId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserChatRoom',
  });
  return UserChatRoom;
};