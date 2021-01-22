import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"
import { projectController } from "../controllers"
import { Router } from "express"



export const projectRouter = Router()

projectRouter.get("/showProjectAllForCreator",auth, lastSeen, projectController.showProjectAllForCreator)
projectRouter.get("/showProjectAllForExecutor",auth, lastSeen, projectController.showProjectAllForExecutor)
projectRouter.post("/showProjectOne",auth, lastSeen, projectController.showProjectOne)
projectRouter.post("/projectStart",auth, lastSeen, projectController.projectStart)
projectRouter.post("/projectFinish",auth, lastSeen, projectController.projectFinish)
projectRouter.post("/projectFinish",auth, lastSeen, projectController.projectFinish)
projectRouter.post("/stakeholderContactChange",auth, lastSeen, projectController.stakeholderContactChange)
