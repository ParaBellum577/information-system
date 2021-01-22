import db from "../db/models/"


export const createNewCardDocument = async ({index, content, current, author, orderTypeId, documentComposition, accessGroups, nameDocument, statusDocumentId,
                                          expirationDate, exitDate, authorVersion, relatedDocuments, initiatorClosingDocument, createdAt}) => {
  return await db.CardDocument.create({
    index,
    content,
    current,
    author,
    orderTypeId,
    documentComposition,
    accessGroups,
    nameDocument,
    statusDocumentId,
    expirationDate,
    exitDate,
    authorVersion,
    relatedDocuments,
    initiatorClosingDocument,
    createdAt,
  });
}

export const findCardDocumentAll = async () => {
  return await db.CardDocument.findAll({
    attributes: ["index","content","author","orderTypeId","documentComposition",
      "accessGroups","nameDocument", "statusDocumentId", "expirationDate",
      "exitDate","authorVersion","createdAt"],
  })
}

export const findCardDocumentByCondition = async (condition) => {
  return await db.CardDocument.findOne({
    where: condition,
    attributes: ["docId","version", "current","index","content","author","orderTypeId","documentComposition",
      "accessGroups","nameDocument", "statusDocumentId", "expirationDate",
      "exitDate","authorVersion","createdAt"],
  })
}

// export const findCardDocumentAllVersion = async(docId)


