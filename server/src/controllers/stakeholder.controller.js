import { stakeholderCreate } from "../services/stakeholder.service"
import { findUserByCondition } from "../integration/user.integration"
import { findUser, updateUser } from "../services/user.service"
import { findSecretCode } from "../services/secretCode.service"
import { checkPassword, findPassword, hashPasswordCreate } from "../services/password.service"



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
      address,
      phone,
      email,
      products, // array of strings
      equipment, // array of int
      positiveStakeholders, // array of strings
      negativeStakeholders, // array of strings
      targetGroups, // array of strings

    } = req.body


    const stakeholderRes = await stakeholderCreate({
      data:
        {
          userId,
          projectName,
          projectArea,
          dateFrom: new Date(dateFrom),
          dateTo: new Date(dateTo),
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
          address,
          phone,
          email,
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
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }

}



export const secretCode = async (req, res) => {
  try {

    const { id, secretCode } = req.body
    
    const user = await findUser({id})
    const code = await findSecretCode(secretCode)

    if (code.userId === user.id && user.emailConfirm === false) {
      user.emailConfirm = true

      await updateUser(user)

      res.status(200).json({ message: "EMAIL_CONFIRM_SUCCESS" })
    } else {
      res.json({ message: "EMAIL_ALREADY_CONFIRMED" })
    }

  } catch (e) {
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}


export const changePassword = async (req, res) => {
  try {
    const userId = req.userId
   // const accessToken = req.acessToken
    const { oldPassword, newPassword } = req.body


    const user = await findPassword( { id: userId })
    const isMatch = await checkPassword(oldPassword, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "WRONG_PASS" })
    }
    user.password = await hashPasswordCreate(newPassword)
    await updateUser(user)
    res.status(200).json({  user })

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const queryConfirm = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.acessToken
    const { stakeholderQueryId } = req.body

    const acceptedQuery = Stakeholder.queryConfirm(stakeholderQueryId)

    res.status(200).json({ acceptedQuery })

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

