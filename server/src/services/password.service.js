import bcrypt from "bcryptjs"
import { takePassword } from "../integration/user.integration"



export const hashPasswordCreate = async (password) => {
  return await bcrypt.hash(password, 12)
}

export const checkPassword = async (password, userPassword) => {
 return await bcrypt.compare(password, userPassword)
}

export const findPassword = async (condition) => {
  return await takePassword(condition)
}