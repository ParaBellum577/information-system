

import { Router } from "express"
import { competenceController, } from "../controllers"
import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"


export const competenceRouter = Router()

competenceRouter.post("/createCompetence", auth, lastSeen, competenceController.createCompetence)
competenceRouter.post("/changeCompetenceName", auth, lastSeen, competenceController.changeCompetenceName)
competenceRouter.get("/showCompetenceAll", auth, lastSeen, competenceController.showCompetenceAll)


