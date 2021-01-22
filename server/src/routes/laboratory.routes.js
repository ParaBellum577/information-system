import { Router } from "express"
import { auth } from "../middleware/auth.middleware"
import { laboratoryController } from "../controllers"

export const router = Router()

//router.post("/addCharacteristic", equipmentController.addCharacteristic)
router.post("/createLaboratory", laboratoryController.createLaboratory)
router.post("/deleteLaboratory", laboratoryController.deleteLaboratory)
router.post("/updateLaboratory", laboratoryController.updateLaboratory)
router.post("/addStaff", laboratoryController.addStaff)
router.post("/removeStaff", laboratoryController.removeStaff)
router.get("/showLaboratoryAll", laboratoryController.showLaboratoryAll)
router.post("/showLaboratoryOne", laboratoryController.showLaboratoryOne)
router.post("/showStaffToAdd", laboratoryController.showStaffToAdd)
router.post("/showStaffInCurrentLab", laboratoryController.showStaffInCurrentLab)
router.post("/showStaffInCurrentLab", laboratoryController.showStaffInCurrentLab)
router.post("/changeSchedule", laboratoryController.changeSchedule)
//router.get("/showEquipments", equipmentController.showEquipments)
//router.post("/createE", auth ,stakeholderController.secretCode)
//router.post("/changePassword", auth ,stakeholderController.changePassword)
