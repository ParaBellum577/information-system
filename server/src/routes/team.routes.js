import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"
import { userController } from "../controllers"
import { Router } from "express"



export const router = Router()

// router.post("/createSprint", auth, lastSeen, userController.changeAvatar)
// router.get("/showSprintAll", auth, lastSeen, userController.showUserList)