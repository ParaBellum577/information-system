import db from "../../../db/models"
import { Op } from "sequelize"

export class ReserveData {

  constructor() {
    this.Equipment = db.app.Equipment
    this.EquipmentReserve = db.app.Equipment
  }

  async findUserByConditionWithoutPass(condition) {

    return await this.db.stakeholders.User.findOne({
     where: condition,
      attributes: { exclude: ["password"] },
      include: [
        {
          model: this.db.stakeholders.Role,
          attributes: ["id", "roleName"],
        },
        {
          model: this.db.stakeholders.Occupation,
          attributes: ["id", "occupationName"],
        },
      ],
    })
  }


  async findUserByCondition(condition) {
    return await this.db.stakeholders.User.findOne({
      where: condition,
      include: [
        {
          model: this.db.stakeholders.Role,
          attributes: ["id", "roleName"],
        },
        {
          model: this.db.stakeholders.Occupation,
          attributes: ["id", "occupationName"],
        },
      ],

    })
  }


  async takePassword(condition) {
    return await this.db.stakeholders.User.findOne({
      where: condition,
      attributes: ["id", "password"],
    })
  }

  async findRoleByName(roleName) {
    return await this.db.stakeholders.Role.findOne({
      where: { roleName },
    })
  }

  async findOccupationByUserId(userId) {
    return await this.db.stakeholders.Role.findAll({
      where: { userId },
    })
  }

  async findRoleAll() {
    return await this.db.stakeholders.Role.findAll({})
  }

  async userUpdateSave(user) {
    return await user.save()
  }


  async userNewSave(user) {


    const occupation = user.occupation
    delete user.occupation
    const roleName = "stakeholder"

    const { id: roleId } = await this.db.stakeholders.Role.findOne({ where: { roleName } })
    const userNew = await this.db.stakeholders.User.create({ ...user, roleId })

    const occupationToSave = await Promise.all(occupation.map(item => {
        return {
          userId: userNew.id,
          occupationName: item,
        }
      }),
    )

    const occupationRes = await this.db.stakeholders.Occupation.bulkCreate(occupationToSave)

    userNew.dataValues.Role = { roleName }
    userNew.dataValues.Occupation = { occupationRes }

    return userNew
  }


  async findUserAll(userId) {
    return await this.db.stakeholders.User.findAll({
      where: {
        id: {
          [Op.not]: userId,
        },
      },
      attributes: ["id", "firstName", "lastName", "avatar"],
      order: [
        ["firstName", "ASC"],
      ],
    })
  }

  async findUserAllByCondition(condition) {
    return await this.db.stakeholders.User.findAll({
      where: condition,
      attributes: ["id", "firstName", "lastName", "avatar"],
      order: [
        ["firstName", "ASC"],
      ],
    })
  }
}