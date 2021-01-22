import fs from "fs"
import pdf from "pdf-creator-node"
import FileType from "file-type"
import {
  createDocumentRoute, documentErrandAddPerformers,
  documentErrandNewSave, documentErrandRemoveById, documentErrandRouteAdd,
  findDocumentErrandAll,
  findDocumentErrandByCondition, findDocumentRouteByCondition,
} from "../integration/documentErrand.integration"
import { cardDocumentsAdd, saveDocument } from "../integration/document.integration"
import {
  createNewCardDocument,
  findCardDocumentByCondition,
} from "../integration/cardDocument.integration"
import normalize from "normalize-path"


export const generatePDF = async (template, data, nameFile) => {
  console.log("generatePDF", data)
  let html
  html = fs.readFileSync(path.resolve(__dirname, template), "utf8")

  let options = {
    format: "A4",
    orientation: "portrait",
    borderLeft: "30mm",
    borderRight: "10mm",
    borderBottom: "20mm",
    borderTop: "20mm",
  }
  let path = "./../src/files/".concat(nameFile, ".pdf")
  let document = {
    html: html,
    data: data,
    path: path,
  }
  const file = await pdf.create(document, options)
  let fileStats = fs.statSync(file)
  await documentNewSave(nameFile, "", 1, "", "pdf", path, fileStats.size, ["document.pdf"], new Date())
}


export const createDocumentErrand = async (documentErrandData) => {
  let nameFile = "Документ-Доручення".concat(formatDate(new Date()), documentErrandData.author)
  let file = await generatePDF("../templateDocuments/documentErrand.html", documentErrandData, nameFile)
  //return await documentErrandNewSave({ documentErrandData.author, filePath })
}

export const findDocumentErrand = async (condition) => {
  return await findDocumentErrandByCondition(condition)
}

export const showDocumentErrandAll = async () => {
  return await findDocumentErrandAll()
}

//За законом України
// export const generateNameFile = async (country, code_institution, createdAt, index, version) => {
//   const dash = "-"
//   const zero = "0"
//   let nameFile = ""
//   nameFile = nameFile.concat(COUNTRY_CODE.country, dash)
//   let codInst = createStringRequiredLength(code_institution, 10)
//   nameFile = nameFile.concat(codInst, dash)
//   nameFile = nameFile.concat(formatDate(createdAt) dash)
//   let pos = index.indexOf("/")
//   let firstPartIndex = index.slice(0, pos)
//   let regIndex = ""
//   if (pos) {
//     let serialNumberDocument = createStringRequiredLength(index.slice(pos + 1), 5)
//     regIndex = regIndex.concat(firstPartIndex, dash, dash, serialNumberDocument, dash, zero)
//   }
//   nameFile = nameFile.concat(regIndex ? regIndex : index)
//   let conversionVersion = createStringRequiredLength(version, 2)
//   nameFile = nameFile.concat(conversionVersion)
//   return nameFile
// }
//
// const formatDate = (date) => {
//   let formatDate = ""
//   let month = createStringRequiredLength(date.getMonth() + 1, 2)
//   let day = createStringRequiredLength(date.getDate(), 2)
//   return formatDate.concat(date.getFullYear(), month, day)
// }
// const createStringRequiredLength = (str, requiredLength) => {
//   const zero = "0"
//   let resStr = str
//   let strLength = str.length
//   while (strLength < requiredLength) {
//     resStr = zero.concat(resStr)
//     strLength = resStr.length
//   }
//   return resStr
// }

export const createCardDocument = async (cardDocument, files) => {
  cardDocument.current = true
  cardDocument.version = 1
  return newCardDocument(cardDocument, files)
}

export const changeCardDocument = async (cardDocument, files) => {
  let oldCardDocument = await findCardDocumentByCondition({ id: cardDocument.id })
  oldCardDocument.current = false
  oldCardDocument.save()
  let newCard = newCardDocument(cardDocument, files)
  newCard.docId = oldCardDocument.docId
  newCard.current = true
  newCard.version = oldCardDocument.version + 1
  newCard.save()
}

const newCardDocument = async (cardDocument, files) => {
  const cardDoc = await createNewCardDocument(cardDocument)
  if (files) {
    await addFiles(cardDoc.id, files)
  }
  return cardDoc
}

const addFiles = async (cardDocumentId, files) => {
  const documentsToSave = await Promise.all(files.map(async (file) => {
    const fileType = await FileType.fromFile(file.path)
    const document = {
      fileName: file.filename,
      fileSize: file.size,
      filePath: normalize(file.path),
      fileType: fileType.ext,
    }
    let doc = await saveDocument(document)
    return {
      cardDocumentId: cardDocumentId,
      documentId: doc.id,
    }
  }))
  return await cardDocumentsAdd(documentsToSave)
}

const createFileForRMK = async (cardDocument) => {
  let nameFile = "rmk" + cardDocument.version + cardDocument.author;
  let file =  await generatePDF("../templateDocuments/rmk.html", cardDocument, nameFile);
  await addFiles(cardDocument.id, [file]);
}

export const createRoute = async (creator, routeName, cardDocumentId) => {
   return await createDocumentRoute(creator, routeName, cardDocumentId);
}
export const addDocErrandToRoute = async ({type, author, deadline, taskText, createdAt,performers, cardDocumentId})=> {
  const errand ={ author,type, deadline, taskText, createdAt}
  const documentErrand = await documentErrandNewSave(errand);
  const route = await findDocumentRouteByCondition({ cardDocumentId: cardDocumentId });
  const documentErrandRoute = await documentErrandRouteAdd({
    documentErrandId: documentErrand.id,
    documentRouteId: route.id
  });
  const performersToSave = await Promise.all(performers.map(async (perform) => {
    return {
      performId: perform,
      documentErrandId: documentErrand.id,
    }
  }))
  await documentErrandAddPerformers(performersToSave)
  return documentErrand;
}

export const  deleteErrand = async (documentErrandId)=> {
  return await documentErrandRemoveById(documentErrandId);
}

// export const findDocumentErrand = async(condition) => {
//
// }
// export const findRoute = async (condition)=> {
//
// }