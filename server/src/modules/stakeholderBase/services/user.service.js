import { User } from "../dataAccess/user.data"
import normalize from "normalize-path"

export class UserService {

  constructor() {
    this.User = new User()

  }

 async findUser(condition)  {
    return await this.User.findUserByCondition(condition)
  }

  async findUserWithoutPass  (condition)  {
    return await this.User.findUserByConditionWithoutPass(condition)
  }

  async updateUser (user) {
    return await this.User.userUpdateSave(user)
  }

  async userCreate  (user) {
    return await this.User.userNewSave(user)
  }

  async takeUserAll  (userId)  {
    return await this.User.findUserAll(userId)
  }
  async showUserListShortWithoutCurrent  (userId)  {
    return await this.User.findUserAllForChatAndOther(userId)
  }
async showUserByCondAll  (condition)  {
    return await this.User.findUserAllByCondition(condition)
  }

  async updateAvatar  (avatar, userId)  {
    const user = await this.User.findUserByConditionWithoutPass({id:userId})
    user.avatar = normalize(avatar.path)
    return await user.save()
  }
}