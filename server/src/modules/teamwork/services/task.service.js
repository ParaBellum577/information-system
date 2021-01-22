import { TaskData } from "../dataAccess/task.data"
import {
  createTask,
  deleteTask,
  joinTaskToSprint,
  showTaskAllInProject, showTaskAllInSprint,
  updateTask,
} from "../controllers/task.controller"
import db from "../../../db/models"


export class TaskService {
  constructor() {
    this.Task = new TaskData()
  }

  async createTask(task) {
    return await this.Task.createTask(task)
  }

  async updateTask(taskId, changedField) {
    const task = await this.Task.findOneByCondition({ id: taskId })

    task[Object.keys(changedField)[0]] = Object.values(changedField)[0]

    return await this.Task.updateTask(task)
  }

  async deleteTask(taskId) {

    return await this.Task.deleteTask(taskId)
  }

  async showTaskAllInProject(condition) {
    return await this.Task.findAllByCondition(condition)
  }

  async joinTaskToSprint(taskId, sprintId) {

    const task = await this.Task.findOneByCondition({ id: taskId })

    task.sprintId = sprintId

    return await this.Task.updateTask(task)

  }

  async showTaskAllInSprint(condition) {
    return await this.Task.findAllByCondition(condition)
  }

}