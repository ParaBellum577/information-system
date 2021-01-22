import db from "../db/models"


export const equipmentNewSave = async ({equipmentName, equipmentDescription, equipmentPic, laboratoryId}) => {

  return await db.app.Equipment.create({
    equipmentName,
    equipmentDescription,
    //equipmentPic,
    laboratoryId
  })  
}

export const characteristicSave = async (characteristicsToSave) => {

 return await db.app.EquipmentCharacteristic.bulkCreate(characteristicsToSave)
}

export const findEquipmentByCondition = async (condition) => {
  return await db.app.Equipment.findOne({
    where:  condition,
    attributes: ["id", "equipmentName", "equipmentDescription", "equipmentPic"],
    include: [{
      model: db.app.EquipmentCharacteristic,
      attributes: ["id", "characteristicName", "characteristicUnit", "characteristicValue"],
    }],
  })
}


export const findEquipmentAll = async () => {
  return await db.app.Equipment.findAll({
    attributes: ["id", "equipmentName", "equipmentDescription", "equipmentPic"],
    include: [{
      model: db.app.EquipmentCharacteristic,
      attributes: ["id", "characteristicName", "characteristicUnit","characteristicValue"],
    }],
  })
}