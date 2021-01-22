import { takeUserAll, updateAvatar, updateUser } from "../services/user.service"


export const changeAvatar = async (req, res) => {
  try {
    const userId = req.userId

    const avatar = req.file
    const user = await updateAvatar( avatar, userId)


    res.status(200).json( user )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showUserList = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.acessToken


    const userList = await takeUserAll(  userId )


    res.status(200).json( userList )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


