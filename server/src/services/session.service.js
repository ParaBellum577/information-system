import useragent from "useragent"
import { findSessionByCondition, sessionSave, sessionUpdateSave } from "../integration/session.integration"
import { accessTokenCreate, refreshTokenCreate } from "./token.service"

export const sessionCreate = async (userId, userAgent, ip) => {

  const refreshToken = refreshTokenCreate()
  const accessToken = accessTokenCreate(userId, refreshToken)

  const agent = useragent.parse(userAgent)
  const os = agent.os.toString()
  const browser = agent.toAgent()

  await sessionSave(userId, ip, os, browser, userAgent, refreshToken)

  return accessToken
}

export const findSession = async (condition) => {
  return await findSessionByCondition(condition)
}

export const sessionUpdate = async (session) => {
  return await sessionUpdateSave(session)
}