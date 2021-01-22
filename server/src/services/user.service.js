import {
  findOccupationByUserId,
  findRoleById,
  findUserAll,
  findUserByCondition,
  findUserByConditionWithoutPass,
  userNewSave,
  userUpdateSave,
} from "../integration/user.integration"
import normalize from 'normalize-path'

export const findUser = async (condition) => {
  const user = await findUserByCondition(condition)
  // const role = await findRoleById(user.roleId)
  // const occupation = await findOccupationByUserId(user.id)
  // user.dataValues.Role = { role }
  // user.dataValues.Occupation = { occupation }
  return await user
}

export const findUserWithoutPass = async (condition) => {
  return await findUserByConditionWithoutPass(condition)
}

export const updateUser = async (user) => {
  return await userUpdateSave(user)
}

export const userCreate = async (user) => {
  return await userNewSave(user)
}

export const takeUserAll = async (userId) => {
  return await findUserAll(userId)
}

export const updateAvatar = async (avatar, userId) => {
  const user = await findUserByConditionWithoutPass({id:userId})
  user.avatar = normalize(avatar.path)
  return await user.save()
}