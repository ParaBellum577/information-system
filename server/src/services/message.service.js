import {
  findMessageByCondition,
  messageSave,
  messageSaveWithUploadFile, messageUpdate, spamSave,
  takeMessageAll,
  takeUploadFileAll,
} from "../integration/message.integration"
import { findChatRoomByCondition } from "../integration/chat.integration"
import normalize from 'normalize-path'

export const messageCreate = async (message, file) => {
  if (file) {
    file.path = normalize(file.path)
  }
  const mess = file
    ? await messageSaveWithUploadFile(message, file)
    : await messageSave(message)

  const chatRoom = await findChatRoomByCondition({id: message.chatRoomId})

  chatRoom.lastMessage = mess.id
  await chatRoom.save()


  return mess
}

export const messageShowAll = async (chatRoomId) => {
  return await takeMessageAll(chatRoomId)
}

export const uploadFileShowAll = async (chatRoomId) => {
  return await takeUploadFileAll(chatRoomId)
}

export const spamCreate = async (messageId, userId) => {
  const message = await findMessageByCondition({ id: messageId })
  await messageUpdate(message)
  return await spamSave(messageId, userId)
}
