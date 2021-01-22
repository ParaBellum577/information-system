import { SprintData } from "../dataAccess/sprint.data"


export class SprintService {
  constructor() {
    this.Sprint = new SprintData()
  }

  async createSprint(sprintName, projectId, creator, dateStart, dateFinish) {
    return await this.Sprint.createSprint({
      sprintName, projectId, creator, dateStart, dateFinish,
    })
  }

  async showSprintAll(projectId) {
    return await this.Sprint.findSprintAll(projectId)
  }

  async deleteSprint (sprintId) {
    return await this.Sprint.deleteSprint(sprintId)
  }

  async updateSprint(sprintId, changedField) {
    const sprint = await this.Sprint.findSprintOneByCondition({id:  sprintId })
    sprint[Object.keys(changedField)[0]] = Object.values(changedField)[0]

    return await this.Sprint.updateSprint(sprint)


  }
}