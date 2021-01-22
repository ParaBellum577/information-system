import { LaboratoryData } from "../integration/laboratory.data"
import db from "../db/models"


export class LaboratoryService {

  constructor() {
    this.Laboratory = new LaboratoryData()
  }


  async createLaboratory(data, schedule) {
    const lab = await this.Laboratory.createLaboratory(data)

    const days = Object.keys(schedule)
    const scheduleRes = days.map(day => {
      return {
        laboratoryId: lab.id,
        dayId: +day,
        workDayStart: schedule[day].workDayStart,
        workDayEnd: schedule[day].workDayEnd,
        dayOff: schedule[day].dayOff || false,
      }
    })


    lab.dataValues.LaboratorySchedule = await this.Laboratory.createLaboratorySchedule(scheduleRes)

    return await lab
  }

  async deleteLaboratory(laboratoryId) {
    const lab = await this.Laboratory.findLabById(laboratoryId)
    lab.isActive = false
    return await this.Laboratory.updateLaboratory(lab)
  }

  async updateLaboratory(laboratoryId, changedField) {

    const lab = await this.Laboratory.findLabById(laboratoryId)
    lab[Object.keys(changedField)[0]] = Object.values(changedField)[0]

    return await this.Laboratory.updateLaboratory(lab)
  }

 async changeSchedule(laboratoryId, dayId, changedField) {

    const schedule = await this.Laboratory.findLabSchedule(laboratoryId, dayId)
   schedule[Object.keys(changedField)[0]] = Object.values(changedField)[0]

    return await this.Laboratory.updateLaboratory(schedule)
  }


  async showStaffToAdd(laboratoryId) {
    return await this.Laboratory.showStaffToAdd(laboratoryId)

  }

  async showStaffInCurrentLab(laboratoryId) {
    return await this.Laboratory.showStaffInCurrentLab(laboratoryId)

  }

  async addLaboratoryStaff(laboratoryId, userId) {
    return await this.Laboratory.addLaboratoryStaff(laboratoryId, userId)
  }

  async removeLaboratoryStaff(laboratoryId, userId) {
    return await this.Laboratory.removeLaboratoryStaff(laboratoryId, userId)
  }

  async showLaboratoryAll() {
    return await this.Laboratory.findLaboratoryAll()
  }

  async showLaboratoryOne(laboratoryId) {
    return await this.Laboratory.findLabById(laboratoryId)
  }

}