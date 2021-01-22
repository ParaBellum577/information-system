import { UserService } from "../services/user.service"

const User = new UserService()

export const changeAvatar = async (req, res) => {
  try {
    const userId = req.userId

    const avatar = req.file
    const user = await User.updateAvatar( avatar, userId)


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


    const userList = await User.takeUserAll(  userId )


    res.status(200).json( userList )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showUserListShortWithoutCurrent = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.acessToken


    const userList = await User.showUserListShortWithoutCurrent(  userId )


    res.status(200).json( userList )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.userId
    // const accessToken = req.acessToken


    const user = await User.findUserWithoutPass({ id:userId } )


    res.status(200).json( user )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}


