

import { Router } from "express"
import { courseController, } from "../controllers"
import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"


export const courseRouter = Router()

courseRouter.post("/createCourse", auth, lastSeen, courseController.createCourse)
courseRouter.get("/showCourseAll", auth, lastSeen, courseController.showCourseAll)
courseRouter.post("/joinCourseToEquipment", auth, lastSeen, courseController.joinCourseToEquipment)
courseRouter.post("/checkUserAdmission", auth, lastSeen, courseController.checkUserAdmission)
courseRouter.post("/enrollmentToCourse", auth, lastSeen, courseController.enrollmentToCourse)

