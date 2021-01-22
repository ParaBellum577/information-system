import db from "../db/models"
import { Op } from "sequelize"

export class LaboratoryData {

  constructor() {
    this.Laboratory = db.app.Laboratory
    this.Equipment = db.app.Equipment
    this.LaboratoryPersonal = db.app.LaboratoryPersonal
    this.LaboratorySchedule = db.app.LaboratorySchedule
    this.User = db.stakeholders.User
    this.Role = db.stakeholders.Role
  }

  async createLaboratory(data) {
    return await this.Laboratory.create({
      ...data,
    })
  }

  async createLaboratorySchedule(data) {
    return await this.LaboratorySchedule.bulkCreate(
      data,
    )
  }

  async updateLaboratory(laboratory) {
    const lab = await laboratory.save()
    await laboratory.reload()
    return lab
  }

  async findLabById(id) {
    const lab = await this.Laboratory.findOne({
      where: { id, isActive: true },
      include: [
        { model: this.Equipment },
        { model: this.LaboratorySchedule },
      ],
      order: [
        [this.LaboratorySchedule, "dayId", "ASC"],
      ],
    })


    lab.dataValues.administrator = await this.User.findOne({
      where: { id: lab.administrator },
    })

    return lab
  }

  async findLabSchedule(laboratoryId, dayId) {
    return await this.LaboratorySchedule.findOne({
      where: { laboratoryId, dayId },
    })

  }

  async findLaboratoryAll() {
    return await this.Laboratory.findAll({
      where: { isActive: true },
      include: [{ model: this.Equipment }, { model: this.LaboratorySchedule }],
      order: [
        [this.LaboratorySchedule, "dayId", "ASC"],
      ],

    })

  }

  async showStaffToAdd(laboratoryId) {
    const users = await this.LaboratoryPersonal.findAll({
      where: { laboratoryId },
      attributes: ["userId"],
    })
    const mas = users.map(user => user.userId)
    return await this.User.findAll({
      where: {
        "$Role.roleName$": "staff", id: {
          [Op.not]: mas,
        },
      },
      include: { model: this.Role },
    })
  }

  async addLaboratoryStaff(laboratoryId, userId) {
    return await this.LaboratoryPersonal.create({
      laboratoryId, userId,
    })
  }


  async showStaffInCurrentLab(laboratoryId) {

    const users = await this.LaboratoryPersonal.findAll({
      where: { laboratoryId },
      attributes: ["userId"],
    })
    const mas = users.map(user => user.userId)
    return await this.User.findAll({
      where: {
        id: mas,
      },
    })
  }

  async removeLaboratoryStaff(laboratoryId, userId) {
    return await this.LaboratoryPersonal.destroy({
      where: { laboratoryId, userId },
    })
  }

}