


import { UserService } from "../../stakeholderBase/services/user.service"

export const lastSeen = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {

    const userInstance = new UserService()

    const user = await userInstance.findUserWithoutPass({id: req.userId})

    user.lastSeen = new Date()
    await userInstance.updateUser(user)

    next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: "NOT_AUTHORIZE" })
  }
}