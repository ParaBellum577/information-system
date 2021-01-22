import {
  characteristicSave, equipmentNewSave,
  findEquipmentAll,
  findEquipmentByCondition,
} from "../integration/equipment.integration"


export const equipmentCreate = async (equipmentData, characteristics) => {

  const equipment = await equipmentNewSave(equipmentData)
  const characteristicsToSave = await Promise.all(characteristics.map(item => {
    return {
      equipmentId: equipment.id,
      characteristicName: item.id,
      characteristicValue: item.value,
      characteristicUnit: item.unit
    }
  }))

  const equipCharRes = await characteristicSave(characteristicsToSave)

  return await findEquipment(equipment.id)

}

export const findEquipment = async (id) => {
  return await findEquipmentByCondition({id})
}

export const showEquipmentAll = async () => {
  return await findEquipmentAll()
}