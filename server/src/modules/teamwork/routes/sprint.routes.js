import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"
import { Router } from "express"
import db from "../../../db/models"
import { taskRouter } from "./task.routes"
import { sprintController } from "../controllers"



export const sprintRouter = Router()

sprintRouter.post("/createSprint", auth, lastSeen, sprintController.createSprint)
sprintRouter.post("/showSprintAll", auth, lastSeen, sprintController.showSprintAll)
sprintRouter.post("/deleteSprint", auth, lastSeen, sprintController.deleteSprint)
sprintRouter.post("/updateSprint", auth, lastSeen, sprintController.updateSprint)