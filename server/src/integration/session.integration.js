import db from "../db/models"


export const sessionSave = async (userId, ip, os, browser, userAgent, token) => {
  return await db.app.Session.create({
    userId,
    ip,
    os,
    browser,
    userAgent,
    token,
  })
}


export const findSessionByCondition = async (condition) => {
  return await db.app.Session.findOne({where: condition})
}

export const sessionUpdateSave = async (session) => {
  return await session.save()
}