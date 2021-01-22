import cryptoRandomString from "crypto-random-string"
import { SecretCode } from "../dataAccess/secretCode.data"

export class SecretCodeService {

  constructor() {
    this.SecretCode = new SecretCode()
  }

  async secretCodeCreate(userId) {
    const code = cryptoRandomString({ length: 16, type: "url-safe" })
    await this.SecretCode.secretCodeSave(userId, code)
    return code
  }

  async findSecretCode(secretCode) {
    return await this.SecretCode.findOneSecretCode(secretCode)
  }
}