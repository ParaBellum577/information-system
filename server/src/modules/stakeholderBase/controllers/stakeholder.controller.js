import { stakeholderCreate, StakeholderService } from "../services/stakeholder.service"
import { findUser, updateUser, UserService } from "../services/user.service"
import { findSecretCode, SecretCodeService } from "../services/secretCode.service"
import {  PasswordService } from "../services/password.service"
import { SessionService } from "../services/session.service"
import { MailService } from "../services/mail.service"

const User = new UserService()
const Password = new PasswordService()
const Session = new SessionService()
const SecretCode = new SecretCodeService()
const Stakeholder = new StakeholderService()

export const create = async (req, res) => {
  try {
    const userId = req.userId
    //const accessToken = req.accessToken

    const {
      projectName,
      projectArea,
      dateFrom,
      dateTo,
      purposeOfProject,
      projectGoals,
      declaration,
      companyRepresentativeName,
      companyRepresentativePosition,
      companyName,
      personType,
      legalForm,
      size,
      numberOfPreviouslyProducts,
      twitter,
      instagram,
      facebook,
      telegram,
      phone,
      email,
      products, // array of strings
      equipment, // array of int
      positiveStakeholders, // array of strings
      negativeStakeholders, // array of strings
      targetGroups, // array of strings

    } = req.body


    const stakeholderRes = await Stakeholder.stakeholderCreate({
      data:
        {
          userId,
          projectName,
          projectArea,
          dateFrom ,
          dateTo,
          purposeOfProject,
          projectGoals,
          declaration,
        },
      contact:
        {
          companyRepresentativeName,
          companyRepresentativePosition,
          companyName,
          personType,
          legalForm,
          size,
          numberOfPreviouslyProducts,
          phone,
          email,
          twitter,
          instagram,
          facebook,
          telegram,
        },
      products, // array of strings
      equipment, // array of strings
      positiveStakeholders, // array of strings
      negativeStakeholders, // array of strings
      targetGroups, // array of strings

    })


    res.status(201).json({ userId, stakeholderRes })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }

}


export const secretCode = async (req, res) => {
  try {

    const { id, secretCode } = req.body

    const user = await User.findUser({ id })
    const code = await SecretCode.findSecretCode(secretCode)

    if (code.userId === user.id && user.emailConfirm === false) {
      user.emailConfirm = true

      await User.updateUser(user)

      res.status(200).json({ message: "EMAIL_CONFIRM_SUCCESS" })
    } else {
      res.json({ message: "EMAIL_ALREADY_CONFIRMED" })
    }

  } catch (e) {
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


export const changePassword = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.accessToken
    const { oldPassword, newPassword } = req.body


    const user = await Password.findPassword({ id: userId })
    const isMatch = await Password.checkPassword(oldPassword, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "WRONG_PASS" })
    }
    user.password = await Password.hashPasswordCreate(newPassword)
    await User.updateUser(user)
    res.status(200).json( {message: "SUCCESS_CHANGE_PASS"} )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const queryConfirm = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.accessToken
    const { stakeholderQueryId } = req.body

    const acceptedQuery = await Stakeholder.queryConfirm(stakeholderQueryId, userId)


    res.status(200).json( acceptedQuery )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const userConfirm = async (req, res) => {
  try {
    //const userId = req.userId
    // const accessToken = req.accessToken
    const { userId } = req.body

    const acceptedUser = await Stakeholder.userConfirm(userId)


    res.status(200).json( acceptedUser )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const queryDecline = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.accessToken
    const { stakeholderQueryId, reason } = req.body

    const rejectedQuery = await Stakeholder.queryDecline(stakeholderQueryId, reason)


    res.status(200).json( rejectedQuery )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}
export const querySpam = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.accessToken
    const { stakeholderQueryId } = req.body

    const rejectedQuery = await Stakeholder.querySpam(stakeholderQueryId)


    res.status(200).json( rejectedQuery )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const userDecline = async (req, res) => {
  try {
    //const userId = req.userId
    // const accessToken = req.accessToken
    const { userId } = req.body

    const rejectedUser = await Stakeholder.userDecline(userId)


    res.status(200).json( rejectedUser )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


export const changeUserRole = async (req, res) => {
  try {

    const { userId, roleId } = req.body

    const user = await Stakeholder.changeUserRole(userId, roleId)


    res.status(200).json( user )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showStakeholderQueryAll = async (req, res) => {
  try {
  //  const userId = req.userId
    // const accessToken = req.acessToken

   const stakeholderQueryList = await Stakeholder.showStakeholderQueryAll()
    res.status(200).json( stakeholderQueryList )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }

}
export const showOnCheckUserAll = async (req, res) => {
  try {
  //  const userId = req.userId
    // const accessToken = req.acessToken

   const userList = await User.showUserByCondAll({emailConfirm: true})
    res.status(200).json( userList )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showAcceptedStakeholderQueryAll = async (req, res) => {
  try {
   // const userId = req.userId
    // const accessToken = req.acessToken

    const stakeholderQueryList = await Stakeholder.showAcceptedStakeholderQueryAll()
    res.status(200).json( stakeholderQueryList )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


// export const verifyAccount = async (req, res) => {
//   try {
//
//     const userId = req.userId
//     const accessToken = req.acessToken
//
//     const code = cryptoRandomString({ length: 16, type: "url-safe" })
//     const secretCode = await db.SecretCode.create({ userId, code })
//
//     if (!secretCode) {
//       return res.status(500).send({ message: "Failed to generate secret code" })
//     }
//     const user = await db.User.findOne({ where: { id: userId } })
//     // Send the email
//     //    let testEmailAccount = await nodemailer.createTestAccount();
//
//     const result = await sendConfirmLink(req.headers.host, userNew.id, email, secretCode)
//
//     if (!result) {
//       return res.status(500).send({ message: "Failed to send message" })
//     }
//
//     res.status(201).json({ message: "Success" })
//   } catch (e) {
//     res.status(500).json({ message: "Something went wrong, please try again" })
//   }
// }

