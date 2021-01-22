import {
  showProjectAllForExecutor,
  showProjectAllForCreator,
  showProjectOne,
  projectStart,
  projectFinish,
  stakeholderContactChange,
} from "./project.controller"


import { createChat, showChatList } from "./chat.controller"
import { createMessage, showMessageAll, showUploadFileAll, createSpam } from "./message.controller"


export const chatController = {
  createChat, showChatList,
}

export const messageController = {
  createMessage, showMessageAll, showUploadFileAll, createSpam,
}


import {
  addUser,
  removeUser,
  showTeamsUser,
  teamUserHistory,
  changeTeamName,
  showTeam,
  showUserToAdd,
  getMyTeams,
} from "./team.controller"

import {
  createSprint,
  showSprintAll,
  deleteSprint,
  updateSprint,
} from "./sprint.controller"

import {
  createTask,
  updateTask,
  deleteTask,
  showTaskAllInProject,
  joinTaskToSprint,
  showTaskAllInSprint
} from "./task.controller"


export const projectController = {
  showProjectAllForExecutor,
  showProjectAllForCreator,
  showProjectOne,
  projectStart,
  projectFinish,
  stakeholderContactChange,
}


export const teamController = {
  addUser,
  removeUser,
  showTeamsUser,
  teamUserHistory,
  showUserToAdd,
  showTeam,
  changeTeamName,
  getMyTeams,
}

export const sprintController = {
  createSprint,
  showSprintAll,
  deleteSprint,
  updateSprint,
}

export const taskController = {
  createTask,
  updateTask,
  deleteTask,
  showTaskAllInProject,
  joinTaskToSprint,
  showTaskAllInSprint
}