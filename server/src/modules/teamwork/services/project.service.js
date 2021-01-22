import { ProjectData } from "../dataAccess/project.data"


export class ProjectService {

  constructor() {
    this.Project = new ProjectData()
  }

  async showProjectAllForExecutor(userId) {

    return await this.Project.showProjectAllForExecutor()
  }

  async showProjectAllForCreator(userId) {

    return await this.Project.showProjectAllForCreator(userId)
  }

  async showProjectOne(projectId) {

    return await this.Project.showProjectOne(projectId)
  }


  async projectStart(projectId) {

    const project = await this.Project.showProjectOne(projectId)
    const statusInProgress = await this.Project.findProjectStatusByName("inProgress")

    project.status = statusInProgress.id
    project.dateStart = new Date()

    await this.Project.projectUpdate(project)
    project.reload()
    return project


  }

  async projectFinish(projectId) {

    const project = await this.Project.showProjectOne(projectId)
    const statusInProgress = await this.Project.findProjectStatusByName("finished")

    project.status = statusInProgress.id
    project.dateFinish = new Date()

    await this.Project.projectUpdate(project)
    project.reload()
    return project

  }

  async stakeholderContactChange(projectId, changedField) {
   // const stakeholderContact = await
  }
}