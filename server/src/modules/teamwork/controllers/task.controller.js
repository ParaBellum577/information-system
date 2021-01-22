import { TaskService } from "../services/task.service"


const Task = new TaskService()

export const createTask = async (req, res) => {
  try {

    const { projectId, executor, taskName, taskText, sprintId, dateStartPlanned, dateFinishPlanned } = req.body

    const creator = req.userId

    const task = await Task.createTask({
      projectId, executor, taskName, taskText, dateStartPlanned, dateFinishPlanned, creator, sprintId,
    })

    res.status(200).json(task)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


export const showTaskAllInProject = async (req, res) => {
  try {

    const { projectId } = req.body

    const tasks = await Task.showTaskAllInProject({
        projectId,
        //isActive: true

    })

    res.status(200).json(tasks)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const  showTaskAllInSprint = async (req, res) => {
  try {

    const { sprintId } = req.body

    const tasks = await Task.showTaskAllInSprint({ sprintId })

    res.status(200).json(tasks)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const joinTaskToSprint =  async (req, res) => {
  try {

    const { taskId, sprintId } = req.body

    const task = await Task.joinTaskToSprint(taskId, sprintId)

    res.status(200).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const updateTask = async (req, res) => {
  try {

    const { taskId, changedField } = req.body
    const task = await Task.updateTask(taskId, changedField)

    res.status(200).json(task)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const deleteTask = async (req, res) => {
  try {

    const { taskId } = req.body

    const task = await Task.deleteTask(taskId)


    res.status(200).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}