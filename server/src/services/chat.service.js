import {
  chatListShow,
  chatRoomSave,
  chatRoomUpdate,
  chatRoomUsersAdd,
  findChatRoomByCondition,
} from "../integration/chat.integration"
import db from "../db/models"
import { col, Op, Sequelize } from "sequelize"
import { element } from "prop-types"


export const chatCreate = async (creator, users) => {

  if (users.length === 2) {

     let chats = await chatListShow(creator)
     const user = +users.find(item => item !== creator)
    const chatExist = chats.map(item => item.toJSON())
      .filter(item => item.ChatRoom.UserChatRooms.length === 1)//.ChatRoom.UserChatRooms.length === 1)
    .filter(item => item.ChatRoom.UserChatRooms[0].userId === user)
    if (chatExist && chatExist.length > 0) {
      return chatExist
    }

  }

  const chatRoom = await chatRoomSave(creator)
  const usersToSave = await Promise.all(users.map(async (item) => {
    return {
      chatRoomId: chatRoom.id,
      userId: item,
    }
  }))

  const chatRoomUsers = await chatRoomUsersAdd(usersToSave)
  return chatRoom
}

export const lastMessageSet = async (chatRoomId, messageId) => {
  const chatRoom = await findChatRoomByCondition({ id: chatRoomId })
  chatRoom.lastSeen = messageId
  return await chatRoomUpdate(chatRoom)
}

export const showChats = async (userId) => {
  return await chatListShow(userId)

  //  const chatListToSend = await Promise.all(res.map(async (item) => {
  //    console.log(item["chatRoomId"])
  //    console.log(delete item['chatRoomId'])
  //    console.log(item["chatRoomId"])
  //    console.log(typeof item)
  //    return {
  //      chatRoom: item.chatRoom
  //    }
  //   console.log(item.chatRoom.userChatRooms)
  //   await Promise.all(item.chatRoom.userChatRooms.map(item1 => {
  //     delete item1.userId
  //
  //   }))
  // }))
  // return chatListToSend
}