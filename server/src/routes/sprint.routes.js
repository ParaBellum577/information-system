import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"
import { userController } from "../controllers"
import { Router } from "express"
import { showChats } from "../services/chat.service"
import db from "../db/models"



export const router = Router()

router.post("/createSprint", auth, lastSeen, async (req,res) => {
  try {
    const { sprintName, sprintPurpose, projectId, creator, dateStart, dateFinish } = req.body

  const sprint = await db.Sprint.create({
    sprintName, sprintPurpose, projectId, creator, dateStart, dateFinish
  })

    res.status(200).json(sprint)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
})


router.post("/showSprintAll", auth, lastSeen,  async (req,res) => {
  try {

    const { projectId } = req.body

    const sprints = await db.Sprint.findAll({
     where:{
       projectId,
       //isActive: true
     }
    })

    res.status(200).json(sprints)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
})