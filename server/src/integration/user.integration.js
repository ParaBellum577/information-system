import db from "../db/models"
import { Op } from "sequelize"

export const findUserByConditionWithoutPass = async (condition) => {
  return await db.stakeholders.User.findOne({
    where: condition,
    attributes: { exclude: ['password'] },
    // include: [
    //   {
    //     model: db.Role,
    //     attributes: ["id", "roleName"],
    //   },
    //   {
    //     model: db.Occupation,
    //     attributes: ["id", "occupationName"],
    //   },
    // ],
  })
}

export const findUserByCondition = async (condition) => {
  return await db.stakeholders.User.findOne({
    where: condition,

  })
}

export const findRoleById = async (id) => {
  // return await db.app.Role.findOne({
  //   where:{id}
  // })
}

export const findOccupationByUserId = async (userId) => {
  return await db.app.Role.findAll({
    where:{userId}
  })
}

export const findRoleAll = async () => {
  return await db.app.Role.findAll({

  })
}

export const takePassword = async (condition) => {
  return await db.stakeholders.User.findOne({
    where: condition,
    attributes:  ['id', 'password']
  })
}

export const userUpdateSave = async (user) => {
  return await user.save()
}

export const userNewSave = async (user) => {

  const occupation = user.occupation
  delete user.occupation
  const roleName = 'stakeholder'

  const { id: roleId } = await db.app.Role.findOne({ where: { roleName } })
  const userNew = await db.stakeholders.User.create({ ...user, roleId })

  const occupationToSave = await Promise.all(occupation.map(item => {
      return {
        userId: userNew.id,
        occupationName: item,
      }
    }),
  )

  const occupationRes = await db.app.Occupation.bulkCreate(occupationToSave)

  userNew.dataValues.Role = { roleName }
  userNew.dataValues.Occupation = { occupationRes }

  return userNew
}

export const findUserAll = async (userId) => {
  return await db.stakeholders.User.findAll({
    where: {
      id: {
        [Op.not]: userId,
      },
    },
    attributes: ['id', 'firstName', 'lastName', 'avatar'],
    order:[
      ['firstName', 'ASC'],
    ]
  })
}