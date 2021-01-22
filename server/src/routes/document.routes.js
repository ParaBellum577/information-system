import { Router } from "express"
import { documentController } from "../controllers"
import multer from "multer"
import path from "path"
import { auth } from "../middleware/auth.middleware"

export const router = Router()

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../documents"))
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

router.post("/createCardDocument", auth, upload.array("files"), documentController.createDocument);
router.post("/changeCardDocument", auth, upload.array("files"), documentController.changeDocument);
router.get("/showCard")
router.post("/createRoute", auth, documentController.createRouteForDocument);
router.post("/addDocumentErrand", auth, documentController.addDocumentErrandToRoute);
router.delete("/deleteDocumentErrand", auth, documentController.deleteDocumentErrand);


