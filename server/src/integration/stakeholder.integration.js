import db from "../db/models"

export const stakeholderSave = async (stakeholder) => {
  return await db.app.Stakeholder.create({ ...stakeholder })
}
export const secretCodeSave = async (userId, code) => {
  return await db.app.SecretCode.create({ userId, code })
}

export const stakeholderEquipmentSave = async (equipmentToSave) => {
  return await db.app.StakeholderEquipment.bulkCreate(equipmentToSave)
}

export const stakeholderProductSave = async (productsToSave) => {
  return await db.app.Product.bulkCreate(productsToSave)
}

export const stakeholderTargetGroupSave = async (targetGroupsToSave) => {
  return await db.app.TargetGroup.bulkCreate(targetGroupsToSave)
}

export const stakeholderInterestSave = async (interestToSave) => {
  return await db.app.StakeholderInterest.bulkCreate(interestToSave)
}

export const findStakeholderByCondition = async (condition) => {
  return await db.app.Stakeholder.findAll({
    where: condition,
     include: [
      {
        model: db.app.Product,
        attributes: ["id", "productName"],
      },
      {
        model: db.app.StakeholderEquipment,
        attributes: ["id", "equipmentId"],
        // include: [{
        //   model: db.Equipment,
        //   attributes: ["equipmentName"],
        // }],
      },
      {
        model: db.app.StakeholderInterest,
        attributes: ["id", "interestName", "isPositive"],
      },
      {
        model: db.app.TargetGroup,
        attributes: ["id", "targetGroupName"],
      },

    ],
  })
}