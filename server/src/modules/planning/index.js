import { stakeholderRouter } from "./routes/stakeholderquery.routes"
import { authRouter } from "./routes/auth.routes"
import { userRouter } from "./routes/user.routes"

export const stakeholderBaseRouter = []

stakeholderBaseRouter.push({fn: "/api/auth", router: authRouter})
stakeholderBaseRouter.push({fn: "/api/stakeholder", router: stakeholderRouter})
stakeholderBaseRouter.push({fn: "/api/user", router: userRouter})