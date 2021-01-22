import {
  chatListShow,
  chatRoomSave,
  chatRoomUpdate,
  chatRoomUsersAdd,
  findChatRoomByCondition,
} from "../dataAccess/chat.integration"
import { TeamData } from "../dataAccess/team.data"
import { Op } from "sequelize"

const Team = new TeamData()

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
  const chats = await chatListShow(userId)
  const usersId = []
  chats.map(chat => chat.ChatRoom?.UserChatRooms.map(user => {
    if (user.userId !== +userId) {
      usersId.push(user.userId)
    }
  }))


  const users = await Team.findUserAllByCondition({
    id: usersId,
  })
  const c = JSON.parse(JSON.stringify(chats))
  return await c.map(chat => {

      return {

        chatRoomId: chat.chatRoomId, ChatRoom: {
          ...chat.ChatRoom, UserChatRooms: chat.ChatRoom?.UserChatRooms.map(user => {

                if (users.find(elem => +elem.id === +user.userId) !== null) {
                  return { ...user, User: users.find(elem => +elem.id === +user.userId) }
                }
            },
          ),
        },
      }
    },
  )




  //   history.push({ user: users.find(elem => elem.id === user.userId), act: "add", date: user.createdAt })
  //   if (user.isActive === false) {
  //     history.push({ user: users.find(elem => elem.id === user.userId), act: "remove", date: user.updatedAt })
  //   }
  // })


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