import db from "../../../db/models"

export class CourseData {

  constructor() {
    this.Course = db.app.Course
    this.CourseEquipment = db.app.CourseEquipment
    this.CourseUser = db.app.CourseUser

  }

  async createCourse(courseData) {
    return await this.Course.create({
      ...courseData,
    })
  }

  async findCourseAll() {
    return await this.Course.findAll()
  }

  async createCourseEquipment(courseId, equipmentId) {
    return await this.CourseEquipment.create({
      courseId, equipmentId,
    })
  }

  async findCourseEquipmentAll(equipmentId) {
    return await this.Course.findAll({
      where: {
        "$CourseEquipments.equipmentId$": equipmentId,

      },
      include: {
        model: this.CourseEquipment,
      },
    })
  }

  async findCourseUserAllByCond(condition) {
    return await this.CourseUser.findAll({
      where: condition,
    })
  }

  async createCourseUser(userId, courseId, dateStart) {
    return await this.CourseUser.create({
      userId,
      courseId,
      dateStart,
    })
  }


}