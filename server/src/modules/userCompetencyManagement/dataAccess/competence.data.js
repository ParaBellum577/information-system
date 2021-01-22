import db from "../../../db/models"

export class CompetenceData {
  constructor() {
    this.Competence = db.app.Competence
  }

  async createCompetence(competenceData) {
    return await this.Competence.create({
      ...competenceData
    })
  }

  async findCompetenceAll() {
    return await this.Competence.findAll()
  }

  async findCompetenceOneByCond(condition) {
    return await this.Competence.findOne({
      where: condition
    })
  }

  async updateCompetence(competence) {
    const c = await competence.save()
    await competence.reload()
    return c
  }
}