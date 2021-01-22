import { teamRouter } from "./routes/team.routes"
import { projectRouter } from "./routes/project.routes"
import { sprintRouter } from "./routes/sprint.routes"
import { taskRouter } from "./routes/task.routes"
import { messageRouter } from "./routes/message.routes"
import { chatRouter } from "./routes/chat.routes"

export const teamworkRouter = []

teamworkRouter.push({fn: "/api/team", router: teamRouter})
teamworkRouter.push({fn: "/api/project", router: projectRouter})
teamworkRouter.push({fn: "/api/sprint", router: sprintRouter})
teamworkRouter.push({fn: "/api/task", router: taskRouter})
teamworkRouter.push({fn: "/api/message", router: messageRouter})
teamworkRouter.push({fn: "/api/chat", router: chatRouter})