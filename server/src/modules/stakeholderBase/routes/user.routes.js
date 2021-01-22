import { auth } from "../middleware/auth.middleware"
import { lastSeen } from "../middleware/lastSeen.middleware"
import { userController } from "../controllers"
import { Router } from "express"
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination:  (req, file, callback) => {
    callback(null, path.join(__dirname, '../avatars'));
  },
  filename:  (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage })

export const userRouter = Router()

userRouter.post("/changeAvatar", auth, upload.single('avatar'), lastSeen, userController.changeAvatar)
userRouter.get("/showUserList", auth, lastSeen, userController.showUserList)
userRouter.get("/showUserListShortWithoutCurrent", auth, lastSeen, userController.showUserListShortWithoutCurrent)
userRouter.get("/showUserList", auth, lastSeen, userController.showUserList)
userRouter.get("/getUserInfo", auth, lastSeen, userController.getUserInfo)