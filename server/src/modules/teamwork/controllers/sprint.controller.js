import db from "../../../db/models"
import { SprintService } from "../services/sprint.service"

const Sprint = new SprintService()

export const createSprint = async (req, res) => {
  try {
    const { sprintName, projectId, dateStart, dateFinish } = req.body

    const creator = req.userId
    const sprint = await Sprint.createSprint(sprintName, projectId, creator, dateStart, dateFinish)

    res.status(200).json(sprint)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showSprintAll = async (req, res) => {
  try {

    const { projectId } = req.body

    const sprints = await Sprint.showSprintAll(projectId)

    res.status(200).json(sprints)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


export const deleteSprint = async (req, res) => {
  try {

    const { sprintId } = req.body

    const sprint = await Sprint.deleteSprint(sprintId)


    res.status(200).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const updateSprint = async (req, res) => {
  try {

    const { sprintId, changedField } = req.body
    
    const sprint = await Sprint.updateSprint(sprintId, changedField)

    res.status(200).json(sprint)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}