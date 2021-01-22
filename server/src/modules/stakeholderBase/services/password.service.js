import bcrypt from "bcryptjs"
import { User } from "../dataAccess/user.data"


export class PasswordService {

  constructor() {
  this.Password = new User()
  }

  async hashPasswordCreate(password) {
    return await bcrypt.hash(password, 12)
  }

  async checkPassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword)
  }

  async findPassword(condition) {
    return await this.Password.takePassword(condition)
  }
}
