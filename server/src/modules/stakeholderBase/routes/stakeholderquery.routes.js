

import { Router } from "express"
import { stakeholderController } from "../controllers"
import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"


export const stakeholderRouter = Router()

stakeholderRouter.post("/create", auth, lastSeen, stakeholderController.create)
//router.post("/verifyAccount", stakeholderController.verifyAccount)
stakeholderRouter.post("/verify", auth, lastSeen, stakeholderController.secretCode)
stakeholderRouter.post("/changePassword", auth, lastSeen, stakeholderController.changePassword)
stakeholderRouter.get("/showStakeholderQueryAll", auth, lastSeen, stakeholderController.showStakeholderQueryAll)
stakeholderRouter.get("/showAcceptedStakeholderQueryAll",  stakeholderController.showAcceptedStakeholderQueryAll)
stakeholderRouter.get("/showOnCheckUserAll", auth, lastSeen, stakeholderController.showOnCheckUserAll)
stakeholderRouter.post("/queryConfirm", auth, lastSeen, stakeholderController.queryConfirm)
stakeholderRouter.post("/querySpam", auth, lastSeen, stakeholderController.querySpam)
stakeholderRouter.post("/queryDecline", auth, lastSeen, stakeholderController.queryDecline)
stakeholderRouter.post("/userConfirm", auth, lastSeen, stakeholderController.userConfirm)
stakeholderRouter.post("/userDecline", auth, lastSeen, stakeholderController.userDecline)
stakeholderRouter.post("/changeUserRole", auth, lastSeen, stakeholderController.changeUserRole)
//router.post("/showProjectAll", auth, lastSeen, stakeholderController.showProjectAll)

