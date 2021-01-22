import { messageCreate, messageShowAll, uploadFileShowAll, spamCreate } from "../services/message.service"
import normalize from 'normalize-path'

export const createMessage = async (req, res) => {
  try {

    const { chatRoomId, author, messageText } = req.body
    const file = req.file

    const message = await messageCreate({ chatRoomId, author, messageText }, file)

    res.status(200).json(message)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showMessageAll = async (req, res) => {
  try {
    const { chatRoomId } = req.body

    const messages = await messageShowAll(chatRoomId)

    res.status(200).json(messages)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showUploadFileAll = async (req, res) => {
  try {
    const { chatRoomId } = req.body

    const uploads = await uploadFileShowAll(chatRoomId)

    res.status(200).json(uploads)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const createSpam = async (req, res) => {
  try {

    const { messageId, userId } = req.body

    const spam = await spamCreate(messageId, userId)

    res.status(200).json(spam)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}
