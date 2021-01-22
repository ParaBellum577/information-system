import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"
import { teamController } from "../controllers"
import { Router } from "express"



export const teamRouter = Router()

// teamRouter.post("/createTeam", auth, lastSeen, userController.changeAvatar)
 teamRouter.post("/addUser", auth, lastSeen, teamController.addUser)
 teamRouter.post("/showTeam", auth, lastSeen, teamController.showTeam)
 teamRouter.post("/showUserToAdd", auth, lastSeen, teamController.showUserToAdd)
 teamRouter.post("/removeUser", auth, lastSeen, teamController.removeUser)
 teamRouter.post("/teamUserHistory", auth, lastSeen, teamController.teamUserHistory)
 teamRouter.post("/showTeamsUser", auth, lastSeen, teamController.showTeamsUser)
 teamRouter.get("/getMyTeams", auth, lastSeen, teamController.getMyTeams)
 teamRouter.post("/changeTeamName", auth, lastSeen, teamController.changeTeamName)