"use strict"
const {
  Model,
} = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.stakeholders.Role, {
        foreignKey: "roleId",
      })
      this.hasMany(models.stakeholders.Occupation, {
        foreignKey: "userId",
      })
      this.belongsToMany(models.app.ChatRoom, {
        foreignKey: 'userId', through: models.app.UserChatRoom,
      })
      this.hasMany(models.app.UserChatRoom, {
        foreignKey: 'userId'
      })
      // this.belongsToMany(models.app.Team, {
      //   foreignKey: 'userId', through: models.app.TeamUser,
      // })
      // this.hasMany(models.app.TeamUser, {
      //   foreignKey: 'userId'
      // })



    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    patronymic: DataTypes.STRING,
    email: DataTypes.STRING,
    dateOfBirth: DataTypes.INTEGER,
    monthOfBirth: DataTypes.INTEGER,
    yearOfBirth: DataTypes.INTEGER,
    nationality: DataTypes.STRING,
    countryOfResidence: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    sourceOfKnowledgeAboutTheLab: DataTypes.STRING,
    purposeOfWorkInLab: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    lastSeen: DataTypes.DATE,
    emailConfirm: { type: DataTypes.BOOLEAN, defaultValue: false },
    userConfirm: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    goIsidMember: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    sequelize,
    schema: "public",
    modelName: "User",
  })
  return User
}