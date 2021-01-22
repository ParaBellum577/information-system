import { findUserWithoutPass, updateUser } from "../services/user.service"

export const lastSeen = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {

    const user = await findUserWithoutPass({id: req.userId})

    user.lastSeen = new Date()
    await updateUser(user)

    next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: "NOT_AUTHORIZE" })
  }
}