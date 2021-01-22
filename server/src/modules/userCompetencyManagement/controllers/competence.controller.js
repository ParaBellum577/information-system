import { CompetenceService } from "../services/competence.service"

const Competence = new CompetenceService()

export const createCompetence = async (req, res) => {
  try {

    const { competenceName, commentOnConfirmation  } = req.body
    const competence = await Competence.createCompetence({ competenceName, commentOnConfirmation })

    res.status(200).json( competence )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const changeCompetenceName = async (req, res) => {
  try {

    const { competenceId, competenceName  } = req.body
    const competence = await Competence.changeCompetenceName( competenceId, competenceName )

    res.status(200).json( competence )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showCompetenceAll = async (req, res) => {
  try {

    const competenceList = await Competence.showCompetenceAll()

    res.status(200).json( competenceList )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


