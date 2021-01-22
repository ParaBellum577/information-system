


import { courseRouter } from "./routes/course.routes"
import {  competenceRouter } from "./routes/competence.routes"

export const userCompetencyManagementRouter = []

userCompetencyManagementRouter.push({fn: "/api/course", router: courseRouter})
userCompetencyManagementRouter.push({fn: "/api/competence", router: competenceRouter})
