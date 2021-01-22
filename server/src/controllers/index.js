import { register, login } from "./auth.controller"
import { secretCode, changePassword } from "./stakeholder.controller"
import { createEquipment, showEquipments } from "./equipment.controller"
import {
  createLaboratory,
  deleteLaboratory,
  updateLaboratory,
  addStaff,
  removeStaff,
  showLaboratoryAll,
  showLaboratoryOne,
  showStaffToAdd,
  showStaffInCurrentLab,
  changeSchedule,
} from "./laboratory.controller"
import { createChat, showChatList } from "./chat.controller"
import { createMessage, showMessageAll, showUploadFileAll, createSpam } from "./message.controller"
import { changeAvatar, showUserList } from "./user.controller"
import { queryConfirm, create } from "../modules/stakeholderBase/controllers/stakeholder.controller"
import {
  createDocument,
  changeDocument,
  createRouteForDocument,
  addDocumentErrandToRoute,
  deleteDocumentErrand
} from "./document.conroller"
//import {showCardDocumentsForCreator} from "../modules/documentflow/controllers/document.controller";

export const authController = {
  register, login,
}

export const stakeholderController = {
  create, secretCode, changePassword, queryConfirm,
}

export const userController = {
  changeAvatar, showUserList,
}


export const equipmentController = {
  createEquipment, showEquipments,
}

export const laboratoryController = {
  createLaboratory, deleteLaboratory, updateLaboratory, addStaff, removeStaff,
  showLaboratoryAll, showLaboratoryOne, showStaffToAdd, showStaffInCurrentLab,
  changeSchedule,
}

export const chatController = {
  createChat, showChatList,
}

export const messageController = {
  createMessage, showMessageAll, showUploadFileAll, createSpam,
}

export const documentController = {
   createDocument, changeDocument, createRouteForDocument, addDocumentErrandToRoute,
  deleteDocumentErrand,// showCardDocumentsForCreator
}
