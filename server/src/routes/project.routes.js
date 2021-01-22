import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"
import { userController } from "../controllers"
import { Router } from "express"
import { showChats } from "../services/chat.service"
import db from "../db/models"



export const router = Router()

router.get("/showProjectAll", auth, lastSeen, async (req,res) => {
  try {
    const userId  = req.userId

    const projects = await db.Project.findAll({
    where:{},
      include: [
        {
          model: db.StakeholderQuery,
          //attributes: ["id", "roleName"],
        },
        {
          model: db.ProjectStatus,
         // attributes: ["id", "occupationName"],
        },
      ],
    })

    res.status(200).json(projects)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
})


