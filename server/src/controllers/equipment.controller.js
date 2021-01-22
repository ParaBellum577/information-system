import { equipmentCreate, showEquipmentAll } from "../services/equipment.service"


// export const addCharacteristic = async (req, res) => {
//   try {
//
//     const { characteristicName, unit } = req.body
//     const characteristic = await db.Characteristic.create({
//       characteristicName,
//       unit,
//
//     })
//
//     res.status(200).json(characteristic)
//   } catch (e) {
//     res.status(500).json({ message: "Something went wrong, please try again", e })
//   }
// }

export const createEquipment = async (req, res) => {
  try {

    const {
      equipmentName,
      equipmentPic,
      equipmentDescription,
      laboratoryId,
      characteristics, //[{name: 'Вес', value:10, unit: 'кг'}, {name: 'Характеристика', value:70, unit: 'кг'}]
    } = req.body
  const equipment = await equipmentCreate({equipmentName, equipmentPic, equipmentDescription, laboratoryId}, characteristics)

    res.status(200).json(equipment)
  } catch (e) {
    res.status(500).json({ message: "SMTHNG_WENT_WRONG", })
  }
}

export const showEquipments = async (req, res) => {
  try {

    const equipments = await showEquipmentAll()

    res.status(200).json(equipments)
  } catch (e) {
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}