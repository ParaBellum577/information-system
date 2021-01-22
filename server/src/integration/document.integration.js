import db from "../db/models"


export const saveDocument = async ({fileName,fileType, filePath, fileSize, createdAt}) => {
  return await db.Document.create({
    fileName,
    fileType,
    filePath,
    fileSize,
    createdAt
  })
}

export const findDocumentAll = async () => {
  return await db.Document.findAll({
    attributes: ["fileName", "fileType", "filePath", "fileSize", "createdAt"],
  })
}

export const findDocumentByCondition = async (condition) => {
  return await db.Document.findOne({
    where: condition,
    attributes: ["fileName", "fileType", "filePath", "fileSize", "createdAt"],
  })
}

export const cardDocumentsAdd = async (documents) => {
  return await db.CardForDocuments.bulkCreate(documents)
}