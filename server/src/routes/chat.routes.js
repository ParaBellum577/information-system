import { Router } from "express"
import { auth } from "../middleware/auth.middleware"
import { chatController } from "../controllers"
import { lastSeen } from "../middleware/lastSeen.middleware"

export const router = Router()

//router.post("/addCharacteristic", equipmentController.addCharacteristic)
router.post("/createChat", auth, lastSeen, chatController.createChat)
router.get("/showChatList", auth, lastSeen, chatController.showChatList)
//router.get("/showEquipments", equipmentController.showEquipments)
//router.post("/createE", auth ,stakeholderController.secretCode)
//router.post("/changePassword", auth ,stakeholderController.changePassword)
