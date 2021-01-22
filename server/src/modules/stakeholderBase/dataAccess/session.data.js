import db from "../../../db/models"

export class Session {

  constructor() {
  this.db = db
  }
  async sessionSave  (userId, ip, os, browser, userAgent, token)  {

    return await this.db.app.Session.create({
      userId,
      ip,
      os,
      browser,
      userAgent,
      token,
    })
  }



  async findSessionByCondition  (condition)  {
    return await this.db.app.Session.findOne({ where: condition })
  }


  async sessionUpdateSave  (session)  {
    return await session.save()
  }
}