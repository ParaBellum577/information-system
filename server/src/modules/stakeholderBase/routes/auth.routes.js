import { Router } from "express"
import { check } from "express-validator"
import dotenv from "dotenv"
import { authController }  from "../controllers"

dotenv.config()

export const authRouter = Router()

authRouter.post("/register",
  [
    check("email", "Incorrect email").isEmail(),
    check(["firstName", "lastName", "patronymic", "nationality",
        "dateOfBirth", "monthOfBirth", "yearOfBirth", "countryOfResidence", "phone",
        "occupation", "email", "sourceOfKnowledgeAboutTheLab", "purposeOfWorkInLab"],
      "Please fill in all fields").notEmpty(),
    check("phone", "Incorrect phone").isMobilePhone("uk-UA"),
  ],
  authController.register,
)

authRouter.post("/login",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Please enter your password").notEmpty(),
  ],
  authController.login,
)

//router.get("/verify-account/:userId/:secretCode", authController.secretCode)
