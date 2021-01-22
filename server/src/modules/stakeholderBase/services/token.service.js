import cryptoRandomString from "crypto-random-string"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export class TokenService {

  async refreshTokenCreate  ()  {
    return cryptoRandomString({ length: 16, type: "url-safe" })

  }

  async accessTokenCreate  (userId, refreshToken)  {
      const accessToken = jwt.sign(
        { userId, refreshToken },
        '' + process.env.JWT_SECRET,
        //  'Secret code for my jwt token',
        { expiresIn: "30m" },
      )

      return { accessToken, refreshToken, }

  }
}