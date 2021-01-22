import { CompetenceData } from "../dataAccess/competence.data"


export class CompetenceService {

  constructor() {
    this.Competence = new CompetenceData()
  }

  async createCompetence (competenceData) {
    return await this.Competence.createCompetence(competenceData)
  }

  async changeCompetenceName (competenceId, competenceName ) {
    const competence = await this.Competence.findCompetenceOneByCond({id: competenceId})
    competence.competenceName = competenceName
    await this.Competence.updateCompetence(competence)
    return competence
  }

  async showCompetenceAll () {
    return await this.Competence.findCompetenceAll()
  }

}