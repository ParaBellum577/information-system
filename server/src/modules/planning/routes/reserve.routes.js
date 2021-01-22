

import { Router } from "express"
import { reserveController } from "../controllers"
import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"


export const reserveRouter = Router()

reserveRouter.post("/createEquipmentReserve", auth, lastSeen, reserveController.createEquipmentReserve)

