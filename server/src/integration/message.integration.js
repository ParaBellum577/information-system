import db from "../db/models"


export const messageSave = async (message) => {

  return await db.app.Message.create({
      ...message,
    },
  )
}

export const messageSaveWithUploadFile = async (message, file) => {

  return await db.app.Message.create({
    ...message,
    UploadFile: {
      fileName: file.filename,
      fileType: file.mimetype,
      fileSize: file.size,
      filePath: file.path,
    },

  }, {
    include: [{
      model: db.app.UploadFile,
    }],
  })
}


export const takeUploadFileAll = async (chatRoomId) => {
  return await db.app.UploadFile.findAll({
    where: {
      "$Message.ChatRoom.id$": chatRoomId,
      "$Message.isActive$": true,
    },
    include: {
      model: db.app.Message,
      attributes: ["id", "isActive"],
      include: {
        model: db.app.ChatRoom,
        attributes: ["id"],
      },
    },
  })
}

export const takeMessageAll = async (chatRoomId) => {

  return await db.app.Message.findAll({
    where: {
      chatRoomId,
      isActive: true
    },
    include: {
      model: db.app.UploadFile,
    },
    order:[
      ['createdAt', 'ASC'],
      ]
  })

}

export const findMessageByCondition = async (condition) => {
  return await db.app.Message.findOne({
    where: {
      condition,
      isActive: true
    },
  })
}

export const spamSave = async (messageId, userId) => {
  return await db.app.Spam.create({
    messageId,
    complainantId: userId,
    statusId: await db.app.SpamStatus.findOne({ where: { status: "onCheck" } }),
  })
}

export const messageUpdate = async (message) => {
  message.isActive = false
  return await message.save()
}