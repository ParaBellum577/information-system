import db from "../../../db/models"


export class SprintData {

  constructor() {
    this.app = db.app
  }

  async createSprint(sprintData) {
    return await this.app.Sprint.create({
      ...sprintData
    })
  }

  async findSprintAll(projectId) {
    return await this.app.Sprint.findAll({
      where: {
        projectId,
      },
    })
  }

  async deleteSprint (sprintId) {
    return await this.app.Sprint.destroy({
      where: { id: sprintId },
    })
  }

  async findSprintOneByCondition (condition) {
    return await this.app.Sprint.findOne({
      where: condition,
    })
  }

  async updateSprint (sprint) {
   const s =  await sprint.save()
    await sprint.reload()
    return s
  }
}