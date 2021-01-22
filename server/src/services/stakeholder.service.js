import {
  findStakeholderByCondition, secretCodeSave,
  stakeholderEquipmentSave, stakeholderInterestSave,
  stakeholderProductSave,
  stakeholderSave, stakeholderTargetGroupSave,
} from "../integration/stakeholder.integration"
import cryptoRandomString from "crypto-random-string"


export const stakeholderCreate = async (stakeholder) => {
  const stakeholderRes = await stakeholderSave(stakeholder.data)

  const equipmentToSave = await Promise.all(stakeholder.equipment.map(item => {

    return {
      stakeholderId: stakeholderRes.id,
      equipmentId: item,
    }
  }))

  const equipmentRes = await stakeholderEquipmentSave(equipmentToSave)

  const productsToSave = await Promise.all(stakeholder.products.map(item => {
      return {
        stakeholderId: stakeholderRes.id,
        productName: item,
      }
    }),
  )

  const productsRes = await stakeholderProductSave(productsToSave)


  const positiveInterestsToSave = await Promise.all(stakeholder.positiveStakeholders.map(item => {
      return {
        stakeholderId: stakeholderRes.id,
        interestName: item,
        isPositive: true,
      }
    }),
  )


  const negativeInterestsToSave = await Promise.all(stakeholder.negativeStakeholders.map(item => {
      return {
        stakeholderId: stakeholderRes.id,
        interestName: item,
        isPositive: false,
      }
    }),
  )

  const interestToSave = [...positiveInterestsToSave, ...negativeInterestsToSave]

  const interestRes = await stakeholderInterestSave(interestToSave)

  const targetGroupsToSave = await Promise.all(stakeholder.targetGroups.map(item => {
      return {
        stakeholderId: stakeholderRes.id,
        targetGroupName: item,
      }
    }),
  )
  const targetGroupsRes = await stakeholderTargetGroupSave(targetGroupsToSave)

  return await findStakeholders({ id: stakeholderRes.id })

}

export const findStakeholders = async (condition) => {
  return await findStakeholderByCondition(condition)
}





