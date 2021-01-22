import { Router } from "express"
import { auth } from "../middleware/auth.middleware"
import { equipmentController } from "../controllers"

export const router = Router()

//router.post("/addCharacteristic", equipmentController.addCharacteristic)
router.post("/createEquipment", equipmentController.createEquipment)
router.get("/showEquipments", equipmentController.showEquipments)
//router.post("/createE", auth ,stakeholderController.secretCode)
//router.post("/changePassword", auth ,stakeholderController.changePassword)
