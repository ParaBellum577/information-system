import db from "../../../db/models/index"

export class TeamData {

  constructor() {
    this.Team = db.app.Team
    this.User = db.stakeholders.User
    this.TeamUser = db.app.TeamUser
  }

  async createT(teamName, creator, users) {

    return await this.Team.create({
      teamName,
      creator,
      TeamUser: [...users],
    })
  }

  async addUser(teamId, userId) {

    return await this.TeamUser.create({
      teamId,
      userId,
    })
  }

  async findTeamUserOne(teamId, userId) {

    return await this.TeamUser.findOne({
      where: {
        teamId,
        userId,
      },
    })
  }

  async updateTeam(team) {

    const t = await team.save()
    await team.reload()
    return t
  }

  async findTeamOneById(teamId) {
    return await this.Team.findOne({
      where: { id: teamId },
    })
  }

  async findTeamOneByProjectId(projectId) {
    return await this.Team.findOne({
      where: { projectId },
    })
  }


  async findTeamUserAllByCondition(condition) {
    return await this.TeamUser.findAll({
      where: condition,
    })
  }

  async findTeamsAllByUserId(condition) {
    return await this.TeamUser.findAll({
      where: { ...condition, isActive: true },
      //attributes: ["id"],
      include: { model: this.Team}
    })
  }

  // async findUserByMasId(usersId) {
  //   return await this.User.findAll({
  //     where: { id: usersId },
  //   })
  // }
  
  async findUserAllByCondition(condition) {
    return await this.User.findAll({
      where: condition,
      attributes: ["id", "firstName", "lastName", "avatar", "lastSeen"]
    })
  }




}