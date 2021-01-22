import useragent from "useragent"
import { TokenService,  } from "./token.service"
import { Session } from "../dataAccess/session.data"


export class SessionService {

  constructor() {
    this.Session = new Session()
    this.Token = new TokenService()
  }

  async sessionCreate(userId, userAgent, ip) {

    const refreshToken = await this.Token.refreshTokenCreate()
    const accessToken = await this.Token.accessTokenCreate(userId, refreshToken)

    const agent = await useragent.parse(userAgent)
    const os = agent.os.toString()
    const browser = agent.toAgent()

    await this.Session.sessionSave(userId, ip, os, browser, userAgent, refreshToken)

    return accessToken
  }


  async findSession(condition) {
    return await this.Session.findSessionByCondition(condition)
  }


  async sessionUpdate(session) {
    return await this.Session.sessionUpdateSave(session)
  }
}