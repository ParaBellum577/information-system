import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import path from "path"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import socket from "socket.io"
import { createServer } from "http"
import trimRequest from "trim-request"



import { router as auth } from "./routes/auth.routes"
import { router as stakeholder } from "../src/modules/stakeholderBase/routes/stakeholderquery.routes"
import { router as equipment } from "./routes/equipment.routes"
import { router as chat } from "./routes/chat.routes"
import { router as message } from "./routes/message.routes"
import { router as user } from "./routes/user.routes"
import { router as team } from "./routes/team.routes"
import { router as sprint } from "./routes/sprint.routes"
import { router as task } from "./routes/task.routes"
import { router as laboratory } from "./routes/laboratory.routes"
import { router as project } from "./routes/project.routes"
import { stakeholderBaseRouter } from "./modules/stakeholderBase"
import { teamworkRouter } from "./modules/teamwork"
import { userCompetencyManagementRouter } from "./modules/userCompetencyManagement"
import { router as document} from "./routes/document.routes"

const app = express()
const http = createServer(app)
const io = socket(http)

dotenv.config()

app.use(bodyParser.json())
//app.use(express.json({ extend: true }))
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: false,
}))

app.use(trimRequest.query)
//app.use(bodyParser.json())
//app.use("/api/auth", auth)
//app.use("/api/stakeholder", stakeholder)
stakeholderBaseRouter.forEach(item => {
  app.use(item.fn, item.router)
})

teamworkRouter.forEach(item => {
  app.use(item.fn, item.router)
})

userCompetencyManagementRouter.forEach(item => {
  app.use(item.fn, item.router)
})
app.use("/api/equipment", equipment)
//app.use("/api/chat", chat)
//app.use("/api/message", message)
//app.use("/api/user", user)
//app.use("/api/team", team)
//app.use("/api/sprint", sprint)
//app.use("/api/task", task)
//app.use("/api/project", project)
app.use("/api/laboratory", laboratory)
app.use("/api/document", document)

if (process.env.NODE_ENV === "production") {

  app.use("/", express.static(path.resolve(__dirname, "../../public")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../public/app/index.html"))
  })
}


io.on("connection", socket => {
  console.log("a user connected")
  socket.on("disconnect", () => {
    console.log("User Disconnected")
  })

  socket.on('message_send', (message, chatRoomId) => {
        socket.to(`room_${chatRoomId}`).emit('message_send',  message);
    console.log(`chatRoomId: ${chatRoomId}, message:${message}`)
    })

    socket.on('join_to_room', (chatRoomIdMas) => {
      console.log('join_to_room')
        chatRoomIdMas.map(item => {
        //  console.log(chatRoomId)
            socket.join(`room_${item.chatRoomId}`);
          console.log(`${socket.id} has joined to room_${item.chatRoomId}`)
        })
    })

})
// io.sockets.on('connection', (socket) =>{
//     console.log('Connected')
//
//
//     socket.on('disconnect', () => {
//         console.log('Disconnected')
//     })
//
//     socket.on('message_send', (message, chatRoomId) => {
//         socket.to(`room_${chatRoomId}`).emit('message_send',  message);
//     })
//
//     socket.on('join_to_room', (chatRoomIdMas) => {
//         chatRoomIdMas.map(chatRoomId => {
//             socket.join(`room_${chatRoomId}`);
//         })
//     })
//
// })

const PORT = process.env.PORT ?? 5000

http.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`))
