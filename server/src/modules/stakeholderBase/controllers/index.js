import { register, login } from "./auth.controller"
import {
  create,
  secretCode,
  changePassword,
  queryConfirm,
  userConfirm,
  showStakeholderQueryAll,
  showAcceptedStakeholderQueryAll,
  showOnCheckUserAll,
  queryDecline,
  userDecline,
  changeUserRole,
  querySpam

} from "./stakeholder.controller"
import { changeAvatar, showUserList, getUserInfo, showUserListShortWithoutCurrent } from "./user.controller"

export const authController = {
  register, login,
}

export const stakeholderController = {
  create,
  secretCode,
  changePassword,
  queryConfirm,
  userConfirm,
  showStakeholderQueryAll,
  showOnCheckUserAll,
  showAcceptedStakeholderQueryAll,
  queryDecline,
  userDecline,
  changeUserRole,
  querySpam

}

export const userController = {
  changeAvatar, showUserList, getUserInfo,showUserListShortWithoutCurrent
}




