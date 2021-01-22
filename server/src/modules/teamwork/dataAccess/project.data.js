import db from "../../../db/models/index"

export class ProjectData {

  constructor() {
    this.db = db
  }

  async showProjectAllForCreator(userId) {

    return await this.db.app.Project.findAll({
      where: {
        creator: userId,
      },
      include: [
        {
          model: db.app.StakeholderQuery,
        },
        {
          model: db.app.ProjectStatus,
        },
      ],
    })
  }

  async showProjectAllForExecutor(userId) {
    return await this.db.app.Project.findAll({
      where: {
        creator: userId,
      },
    })
  }

  async showProjectOne(id) {
    return await this.db.app.Project.findOne({
      where: { id },
      include: [
        {
          model: this.db.app.StakeholderQuery,
          include: [
            {
              model: this.db.app.StakeholderContact
            },
          ],
        },
        {
          model: this.db.app.ProjectStatus,
        },
      ],
    })
  }

  async findProjectStatusByName(name) {

    return await this.db.app.ProjectStatus.findOne({
      where: {status: name}
    })
  }

  async projectUpdate(project) {
    project.save()
  }

  async findStakeholderContact(project) {

  }

}