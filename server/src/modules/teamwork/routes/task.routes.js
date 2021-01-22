import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"
import { Router } from "express"
import { taskController } from "../controllers"

export const taskRouter = Router()

taskRouter.post("/createTask", auth, lastSeen, taskController.createTask)
taskRouter.post("/showTaskAllInProject", auth, lastSeen, taskController.showTaskAllInProject)
taskRouter.post("/showTaskAllInSprint", auth, lastSeen, taskController.showTaskAllInSprint)
taskRouter.post("/joinTaskToSprint", auth, lastSeen, taskController.joinTaskToSprint)
taskRouter.post("/updateTask", auth, lastSeen, taskController.updateTask)
taskRouter.post("/deleteTask", auth, lastSeen, taskController.deleteTask)