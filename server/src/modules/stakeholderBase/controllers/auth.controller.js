import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { MailService } from "../services/mail.service"
import { SessionService } from "../services/session.service"
import { SecretCodeService } from "../services/secretCode.service"
import { UserService } from "../services/user.service"
import { PasswordService } from "../services/password.service"

const User = new UserService()
const Password = new PasswordService()
const Session = new SessionService()
const SecretCode = new SecretCodeService()
const Mail = new MailService()

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

    const emailExist = await User.findUser({ email } )

    if (emailExist) {
      return res.status(400).json({ message: "EMAIL_ALREADY_EXIST" })
    }

    const hashPassword = await Password.hashPasswordCreate(password)

    const userNew = await User.userCreate({
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

    const user = await User.findUserWithoutPass({id: userNew.id})
    const userAgent = req.headers["user-agent"]
    const ip = req.ip

    const accessToken = await Session.sessionCreate(user.id, userAgent, ip)

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      //  secure: true
    })

    const secretCode = await SecretCode.secretCodeCreate(user.id)

    if (!secretCode) {
      return res.status(500).send({ message: "SECRET_CODE_ERROR" })
    }

    let result = Mail.sendConfirmLink(req.headers.host, user.id, email, secretCode)
    if (!result) {
      return res.status(500).send({ message: "SEND_EMAIL_ERROR" })
    }

    res.status(201).json({ accessToken, user })


  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
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

    const user = await User.findUser({email})

    if (!user) {
      return res.status(400).json({ message: "EMAIL_DOESNT_EXIST" })
    }


    const isMatch = await Password.checkPassword(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "WRONG_PASS" })
    }
    const userAgent = req.headers["user-agent"]
    const ip = req.ip

    const accessToken = await Session.sessionCreate(user.id, userAgent, ip)

    const userToSend = await User.findUserWithoutPass({ email })
    res.cookie("jwt", accessToken, {
      httpOnly: true,
    //  secure: true
    })
    res.status(200).json({ accessToken, user: userToSend })

  } catch (e) {
    console.log(e)

    res.status(500).json({ message: "SMTHNG_WENT_WRONG",pr1:2, e, })
  }
}

