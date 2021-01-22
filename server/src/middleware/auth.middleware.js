import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { findSession, sessionUpdate } from "../services/session.service"
import { accessTokenCreate, refreshTokenCreate } from "../services/token.service"

//dotenv.config()

export const auth = async (req, res, next) => {
  // if (req.method === "OPTIONS") {
  //   return next()
  // }

  try {
    if (process.env.NODE_ENV === "development") {
      if (req.body.id) {
        req.userId = req.body.id

      } else if (req.params.id) {
        req.userId = req.params.id
      } else if (req.query.id) {
        req.userId = req.query.id
      }

      next()
    } else if (process.env.NODE_ENV === "production") {

      let accessToken = req.cookies.jwt.accessToken
      if (!accessToken) {

        res.clearCookie("jwt")
        return res.status(401).json({ message: "NOT_AUTHORIZE" })
      }

      const decoded = jwt.decode(accessToken, process.env.JWT_SECRET)

      if (Date.now() >= decoded.exp * 1000) {
        const session = await findSession({ token: decoded.refreshToken })

        if (!session) {
          res.clearCookie("jwt")
          return res.status(401).json({ message: "NOT_AUTHORIZE" })
        }

        if (new Date(session.expiredAt).getTime() < new Date().getTime()) {
          res.clearCookie("jwt")
          return res.status(401).json({ message: "NOT_AUTHORIZE" })
        } else {
          const refreshToken = refreshTokenCreate()
          session.token = refreshToken
          session.expiredAt = new Date(session.expiredAt.getTime() + 1000 * 60 * 60 * 24 * 7)
          const sd = await sessionUpdate(session)

          accessToken = accessTokenCreate(decoded.userId, refreshToken)
          res.cookie("jwt", accessToken, {
            httpOnly: true,
            //  secure: true
          })
        }
      }

      req.userId = decoded.userId
      req.acessToken = accessToken
      req.role = decoded.role

      next()
    }

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: "NOT_AUTHORIZE" })
  }
}