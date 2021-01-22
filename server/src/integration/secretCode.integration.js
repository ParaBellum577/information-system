import db from "../db/models"


export const findOneSecretCode =  async (secretCode) => {
  return await db.app.SecretCode.findOne({ where: { code: secretCode } })
}