import { TeamData } from "../dataAccess/team.data"
import { Op } from "sequelize"

export class TeamService {

  constructor() {
    this.Team = new TeamData()
  }


  async addUser(teamId, userId) {
    return await this.Team.addUser(teamId, userId)
  }

  async removeUser(teamId, userId) {
    const user = await this.Team.findTeamUserOne(teamId, userId)
    user.isActive = false
    return await this.Team.updateTeam(user)
  }

  async changeTeamName(teamId, teamName) {
    const team = await this.Team.findTeamOneById(teamId)

    team.teamName = teamName
    return await this.Team.updateTeam(team)
  }

  async showTeam(projectId) {
    return await this.Team.findTeamOneByProjectId(projectId)

  }

  async showTeamsUser(teamId) {
    const users = await this.Team.findTeamUserAllByCondition({ teamId, isActive: true })

    const mas = users.map(user => user.userId)

    return await this.Team.findUserAllByCondition({ id: mas })
  }

  async getMyTeams(userId) {
    return await this.Team.findTeamsAllByUserId({ userId })
  }

  async showUserToAdd(teamId) {
    const users = await this.Team.findTeamUserAllByCondition({ teamId, isActive: true })

    const mas = users.map(user => user.userId)

    return await this.Team.findUserAllByCondition({
      id: {
        [Op.not]: mas,
      },
    })
  }

  async teamUserHistory(teamId) {
    const history = []
    const usersId = await this.Team.findTeamUserAllByCondition({ teamId })
    const mas = usersId.map(user => user.userId)
    const users = await this.Team.findUserAllByCondition({ id: mas })

    usersId.map((user) => {

      history.push({ user: users.find(elem => elem.id === user.userId), act: "add", date: user.createdAt })
      if (user.isActive === false) {
        history.push({ user: users.find(elem => elem.id === user.userId), act: "remove", date: user.updatedAt })
      }
    })

    history.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date)
    })
    return history


  }

}