import { TeamService } from "../services/team.service"
import db from "../../../db/models"
const Team = new TeamService()

export const addUser =  async (req, res) => {
  try {
    const { teamId, userId, } = req.body

    await Team.addUser(teamId, userId)

    res.status(200).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const removeUser =  async (req, res) => {
  try {
    const { teamId, userId, } = req.body

    await Team.removeUser(teamId, userId)

    res.status(200).json({})
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showTeam =  async (req, res) => {
  try {
    const { projectId } = req.body

    const team = await Team.showTeam(projectId)
    console.log(team)

    res.status(200).json(team)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const changeTeamName =  async (req, res) => {
  try {
    const { teamId, teamName, } = req.body

    const team = await Team.changeTeamName(teamId, teamName)

    res.status(200).json(team)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showTeamsUser =  async (req, res) => {
  try {
    const { teamId } = req.body

    const users = await Team.showTeamsUser(teamId)


    res.status(200).json(users)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const getMyTeams =  async (req, res) => {
  try {
    const userId = req.userId

    const teams = await Team.getMyTeams(userId)


    res.status(200).json(teams)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showUserToAdd =  async (req, res) => {
  try {
    const { teamId } = req.body

    const users = await Team.showUserToAdd(teamId)


    res.status(200).json(users)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const teamUserHistory =  async (req, res) => {
  try {
    const { teamId } = req.body

    const history = await Team.teamUserHistory(teamId)


    res.status(200).json(history)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}