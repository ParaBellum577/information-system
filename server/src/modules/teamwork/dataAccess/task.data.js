import db from "../../../db/models"


export class TaskData {


  constructor() {
    this.Task = db.app.Task
  }

  async createTask(task) {
    return await this.Task.create({
      ...task,
    })
  }

  async findOneByCondition(condition) {
    return await this.Task.findOne({
      where: condition,
    })
  }

  async findAllByCondition(condition) {
    return await this.Task.findAll({
      where: condition,
    })
  }

  async updateTask(task) {
    const t = await task.save()
    await task.reload()
    return t
  }

  async deleteTask(taskId) {
    return await this.Task.destroy({
      where: { id: taskId },
    })
  }

}