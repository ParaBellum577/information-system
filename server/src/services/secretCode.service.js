import cryptoRandomString from "crypto-random-string"
import { secretCodeSave } from "../integration/stakeholder.integration"
import { findOneSecretCode } from "../integration/secretCode.integration"

export const secretCodeCreate = async (userId) => {
  const code = cryptoRandomString({ length: 16, type: "url-safe" })
  await secretCodeSave(userId ,code)
  return code
}

export const findSecretCode = async (secretCode) => {
  return await findOneSecretCode(secretCode)
}