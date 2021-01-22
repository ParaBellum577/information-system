import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { sendConfirmLink } from "../services/mail.service"
import { sessionCreate } from "../services/session.service"
import { secretCodeCreate } from "../services/secretCode.service"
import { findUser, findUserWithoutPass, userCreate } from "../services/user.service"
import { checkPassword, hashPasswordCreate } from "../services/password.service"


export const register = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: errors.array()[0].msg,
      })
    }

    const { firstName, lastName, patronymic, nationality, dateOfBirth, monthOfBirth, yearOfBirth, countryOfResidence, phone, occupation, email, sourceOfKnowledgeAboutTheLab, purposeOfWorkInLab, password } = req.body

    const emailExist = await findUser({ email } )

    if (emailExist) {
      return res.status(400).json({ message: "EMAIL_ALREADY_EXIST" })
    }

    const hashPassword = await hashPasswordCreate(password)

    const user = await userCreate({
      firstName,
      lastName,
      patronymic,
      nationality,
      dateOfBirth: +dateOfBirth,
      monthOfBirth: +monthOfBirth,
      yearOfBirth: +yearOfBirth,
      countryOfResidence,
      phone,
      email,
      sourceOfKnowledgeAboutTheLab,
      purposeOfWorkInLab,
      password: hashPassword,
      occupation,
    })

    //const user = await findUserWithoutPass({id: userNew.id})
    const userAgent = req.headers["user-agent"]
    const ip = req.ip

    const accessToken = await sessionCreate(user.id, userAgent, ip)

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      //  secure: true
    })

    const secretCode = await secretCodeCreate(user.id)

    if (!secretCode) {
      return res.status(500).send({ message: "SECRET_CODE_ERROR" })
    }

    let result = sendConfirmLink(req.headers.host, user.id, email, secretCode)
    if (!result) {
      return res.status(500).send({ message: "SEND_EMAIL_ERROR" })
    }

    res.status(201).json({ accessToken, user })


  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG", })
  }

}



export const login = async (req, res) => {
  try {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: errors.array()[0].msg,
      })
    }

    const { email, password } = req.body

    const user = await findUser({email})

    if (!user) {
      return res.status(400).json({ message: "EMAIL_DOESNT_EXIST" })
    }


    const isMatch = await checkPassword(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "WRONG_PASS" })
    }
    const userAgent = req.headers["user-agent"]
    const ip = req.ip

    const accessToken = await sessionCreate(user.id, userAgent, ip)

    const userToSend = await findUserWithoutPass({email})
    res.cookie("jwt", accessToken, {
      httpOnly: true,
    //  secure: true
    })
    res.status(200).json({ accessToken, user: userToSend })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}

