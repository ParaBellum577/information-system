import { Router } from "express"
import { auth } from "../middleware/auth.middleware"
import { messageController } from "../controllers"
import { lastSeen } from "../middleware/lastSeen.middleware"
import multer  from 'multer'
import path from 'path'
import fs from 'fs'



const storage = multer.diskStorage({
  destination:  (req, file, callback) => {
    const dir = path.join(__dirname, '../uploads')
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    callback(null, dir );
  },
  filename:  (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage })


export const router = Router()


router.post("/createMessage", auth,upload.single('file'), lastSeen, messageController.createMessage)
router.post("/showMessageAll", auth, lastSeen, messageController.showMessageAll)
router.post("/showUploadFileAll", auth, lastSeen, messageController.showUploadFileAll)
router.post("/createSpam", auth, lastSeen, messageController.createSpam)

