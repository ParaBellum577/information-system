import { showEquipmentAll } from "../services/equipment.service"
import { LaboratoryService } from "../services/laboratory.service"

const Laboratory = new LaboratoryService()

export const createLaboratory = async (req, res) => {
  try {

    const {laboratoryName, administrator, schedule} = req.body
    
    const laboratory = await Laboratory.createLaboratory({laboratoryName, administrator}, schedule)

    res.status(200).json(laboratory)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const deleteLaboratory = async (req, res) => {
  try {

    const {laboratoryId} = req.body

    const laboratory = await Laboratory.deleteLaboratory(laboratoryId)

    res.status(200).json(laboratory)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const updateLaboratory = async (req, res) => {
  try {

    const { laboratoryId, changedField } = req.body

    const laboratory = await Laboratory.updateLaboratory(laboratoryId, changedField)

    res.status(200).json(laboratory)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const changeSchedule = async (req, res) => {
  try {

    const { laboratoryId, dayId, changedField } = req.body

    const schedule = await Laboratory.changeSchedule(laboratoryId, dayId, changedField)

    res.status(200).json(schedule)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const addStaff = async (req, res) => {
  try {

    const { laboratoryId, userId } = req.body

    const laboratory = await Laboratory.addLaboratoryStaff(laboratoryId, userId)

    res.status(200).json(laboratory)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const removeStaff = async (req, res) => {
  try {

    const { laboratoryId, userId } = req.body

    const laboratory = await Laboratory.removeLaboratoryStaff(laboratoryId, userId)

    res.status(200).json(laboratory)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const showLaboratoryAll = async (req, res) => {
  try {


    const laboratories = await Laboratory.showLaboratoryAll()

    res.status(200).json(laboratories)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const showLaboratoryOne = async (req, res) => {
  try {

    const {laboratoryId} = req.body

    const laboratory = await Laboratory.showLaboratoryOne(laboratoryId)

    res.status(200).json(laboratory)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const showStaffToAdd = async (req, res) => {
  try {

    const { laboratoryId } = req.body

    const staff = await Laboratory.showStaffToAdd(laboratoryId)

    res.status(200).json(staff)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

export const showStaffInCurrentLab = async (req, res) => {
  try {

    const { laboratoryId } = req.body

    const staff = await Laboratory.showStaffInCurrentLab(laboratoryId)

    res.status(200).json(staff)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}