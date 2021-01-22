



import db from "../../../db/models"
import { Op } from "sequelize"

export const chatRoomSave = async (creator, users) => {
  return await db.app.ChatRoom.create({
    creator,
  })

}

export const chatRoomUpdate = async (chatRoom) => {
  return await chatRoom.save()
}

export const findChatRoomByCondition = async (condition) => {
  return await db.app.ChatRoom.findOne({
    where: {
      ...condition,
      isActive: true,
    },
  })
}

export const chatRoomUsersAdd = async (users) => {
  return await db.app.UserChatRoom.bulkCreate(users)
}

export const findUserAllByCondition = async (condition) => {

}

export const chatListShow = async (userId) => {


  // return await db.ChatRoom.findAll({
  //   where: {
  //     isActive: true,
  //     "$UserChatRoom.id$": 3,
  //   },
  //   include: {
  //     model: db.UserChatRoom,
  //     attributes: ['id'],
  //     include: {
  //       model: db.User,
  //       //attributes: ['id', 'firstName', 'lastName', 'avatar', 'lastSeen']
  //     }
  //   })

  //as:'users'
  // where: {
  //   userId: {
  //     [Op.not]: userId,
  //   },
  // },
  //  attributes: ["id"],
  //  duplicating: true
  //  include: {
  //    model: db.ChatRoom,
  //    attributes: ["id"],
  //  },
  //   },
  // })
  //
  return await db.app.UserChatRoom.findAll({
    where: {
      userId,
    },
    attributes: ["chatRoomId"],
    include: [{
      // where: {isActive: true},
      model: db.app.ChatRoom,
      attributes: ["id", "creator", "lastMessage"],
      include: [
        {
          where: {
            userId: {
              [Op.not]: userId,
            },
          },
        model: db.app.UserChatRoom,
        attributes: ["userId"],
        // include: [{
        //   where: {
        //     id: {
        //       [Op.not]: userId,
        //     },
        //   },
        //   model: db.stakeholders.User,
        //   attributes: ["id", "firstName", "lastName", "lastSeen", "avatar"],
        // }],
      },

      //   {
      //   model: db.app.Message, include: [{ model: db.app.UploadFile }],
      // }

      ],
    }],
    //   attributes: ['id'],
    // include: [{
    //   model: db.userChatRoom,
    //   //as: 'User',
    //   attributes: ['id'],
    //   include: [{
    //     model: db.User,
    //     attributes: ['id', 'firstName', 'lastName',
    //       //'lastSeen',
    //     //  'avatar',
    //     ]
    //   }]
    // }],
  })


}