import {
  createCardDocument,
  changeCardDocument,
  createRoute, addDocErrandToRoute, deleteErrand,
} from "../services/document.service"

export const createDocument = async (req, res) => {
  console.log("Create card document")
  try {
    const {
      index, createdAt, content, author, orderType, documentComposition,
      accessGroups, nameDocument, statusDocument, expirationDate,
      exitDate, authorVersion, initiatorClosingDocument, relatedDocuments,
    } = req.body

    const files = req.file
    const cardDocument = await createCardDocument({
      index, createdAt, content, author, orderType, documentComposition,
      accessGroups, nameDocument, statusDocument, expirationDate,
      exitDate, authorVersion, initiatorClosingDocument, relatedDocuments,
    }, files)
    res.status(200).json(cardDocument)

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" }, e)
  }
}
export const changeDocument = async (req, res) => {
  console.log("Change card document")
  try {
    const {
      id, index, createdAt, content, author, orderType, documentComposition,
      accessGroups, nameDocument, statusDocument, expirationDate,
      exitDate, authorVersion, initiatorClosingDocument, relatedDocuments,
    } = req.body

    const files = req.file
    const cardDocument = await changeCardDocument({
      id, index, createdAt, content, author, orderType, documentComposition,
      accessGroups, nameDocument, statusDocument, expirationDate,
      exitDate, authorVersion, initiatorClosingDocument, relatedDocuments,
    }, files)
    res.status(200).json(cardDocument)

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" }, e)
  }
}

export const createRouteForDocument = async (req, res) => {
  try {
    const {creator, routeName, cardDocumentId } = req.body
    const route = await createRoute(creator, routeName, cardDocumentId)
  } catch (e) {
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" }, e)
  }
}

export const addDocumentErrandToRoute = async (req, res) => {
  try {
    const {
      type, author, deadline, taskText, createdAt,performers, cardDocumentId,
    } = req.body;
    const document = await addDocErrandToRoute({
      type, author, deadline, taskText, createdAt,performers, cardDocumentId,
    })
    res.status(200).json(document)
  } catch (e) {
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" }, e)
  }
}

export const deleteDocumentErrand = async (req, res) => {
  try {
    const { documentErrandId } = req.body
    const deleteDocumentErrand = await deleteErrand(documentErrandId)
    res.status(200)
  } catch (e) {
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" }, e)
  }
}

export const showCardDocumentsForCreator = async (req, res) => {
  try {
    const userId = req.userId
    const cardDocumentList = await Document.showCardDocumentByCondition({author: userId})

    res.status(200).json(cardDocumentList)
  } catch (e) {
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  e})
  }
}
