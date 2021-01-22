

import { Router } from "express"
import { stakeholderController } from "../controllers"
import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"


export const router = Router()

router.post("/create", auth, lastSeen, stakeholderController.create)
//router.post("/verifyAccount", stakeholderController.verifyAccount)
router.post("/verify", auth, lastSeen, stakeholderController.secretCode)
router.post("/changePassword", auth, lastSeen, stakeholderController.changePassword)
router.post("/queryConfirm", auth, lastSeen, stakeholderController.queryConfirm)

