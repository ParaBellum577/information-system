import { chatCreate, showChats } from "../services/chat.service"



export const createChat = async (req, res) => {
 try {
   const { creator, users } = req.body

   const chat = await chatCreate(creator, users)

   res.status(200).json(
     chat
   //  { creator, users }
     )
 } catch (e) {
   console.log(e)
   res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
 }
}

export const showChatList = async (req, res) => {
  try {
    const { userId } = req

    const chatList = await showChats(userId)

    res.status(200).json(chatList)
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG",  })
  }
}