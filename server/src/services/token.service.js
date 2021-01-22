import cryptoRandomString from "crypto-random-string"
import jwt from "jsonwebtoken"


export const refreshTokenCreate = () => {
  return cryptoRandomString({ length: 16, type: "url-safe" })

}
export const accessTokenCreate = (userId, refreshToken) => {
  const accessToken = jwt.sign(
    { userId, refreshToken },
    process.env.JWT_SECRET,
    { expiresIn: "30m" },
  )

  return {accessToken, refreshToken}
}