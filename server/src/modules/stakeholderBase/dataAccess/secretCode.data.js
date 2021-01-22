import db from "../../../db/models"

export class SecretCode {

  constructor() {
    this.db = db
  }

  async findOneSecretCode(secretCode) {
    return await this.db.app.SecretCode.findOne({ where: { code: secretCode } })
  }

  async secretCodeSave(userId, code) {
    return await this.db.app.SecretCode.create({ userId, code })
  }

}