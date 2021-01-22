import db from "../db/models"


export const documentErrandNewSave = async ({author, type, performers, deadline, taskText, filePath}) => {
  return await db.DocumentErrand.create({
    author,
    type,
    performers,
    deadline,
    taskText,
    filePath
  })
}

export const findDocumentErrandAll = async () => {
  return await db.DocumentErrand.findAll({
    attributes: ["id", "author", "type", "deadline", "taskText"],
  })
}

export const findDocumentErrandByCondition = async (condition) => {
  return await db.DocumentErrand.findOne({
    where:  condition,
    attributes: ["id", "author", "type", "deadline", "taskText"],
  })
}

export const createDocumentRoute = async (creator,routeName, cardDocumentId)=>{
   return await db.DocumentRoute.create({
     routeName,
     creator,
     cardDocumentId,
     createdAt: new Date()
   })
}

export const documentErrandRouteAdd = async (documentErrandId, documentRouteId) => {
  return await db.DocumentErrandRoute.create({
    documentErrandId,
    documentRouteId
  })
}

export const findDocumentRouteByCondition = async (condition) => {
  return await db.DocumentRoute.findOne({
    where:  condition,
    attributes: ["id", "routeName", "creator","cardDocumentId", "createdAt"],
  })
}

export const documentErrandAddPerformers = async (performers) => {
  return await db.PerformersDocumentErrand.bulkCreate(performers)
}

export const documentErrandRemoveById = async(id)=> {
  return await db.DocumentErrand.destroy({
    where: { id }
  })
}