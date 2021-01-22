
import { ProjectService } from "../services/project.service"


const Project = new ProjectService()

export const showProjectAllForCreator =  async (req, res) => {
  try {
    const userId = req.userId

    const projectList = await Project.showProjectAllForCreator(userId)

    res.status(200).json(projectList)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showProjectOne =  async (req, res) => {
  try {
    const { projectId } = req.body

    const project = await Project.showProjectOne(projectId)

    res.status(200).json(project)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const projectStart =  async (req, res) => {
  try {
    const { projectId } = req.body

    const project = await Project.projectStart(projectId)

    res.status(200).json(project)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


export const projectFinish =  async (req, res) => {
  try {
    const { projectId } = req.body

    const project = await Project.projectFinish(projectId)

    res.status(200).json(project)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const stakeholderContactChange =  async (req, res) => {
  try {
    const { projectId, changedField } = req.body

    const project = await Project.stakeholderContactChange(projectId, changedField)

    res.status(200).json(project)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


export const showProjectAllForExecutor =  async (req, res) => {
  try {
    const { projectId } = req.body

    const sprints = await db.Project.findAll({
      where: {
        //projectId,
        //isActive: true
      },
      include: [
        {
          model: db.StakeholderQuery
        },
        {
          model: db.ProjectStatus
        },
      ],

    })

    res.status(200).json(sprints)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

