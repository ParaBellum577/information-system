import { CourseData } from "../dataAccess/course.data"


export class CourseService {

  constructor() {
    this.Course = new CourseData()

  }

  async createCourse(courseData) {
    return await this.Course.createCourse(courseData)
  }

  async showCourseAll() {
    return await this.Course.findCourseAll()
  }

  async joinCourseToEquipment(courseId, equipmentId) {
    return await this.Course.createCourseEquipment(courseId, equipmentId)
  }

  async checkUserAdmission(userId, equipmentId) {
    const courses = await this.Course.findCourseEquipmentAll(equipmentId)

    const coursesId = courses.map(course => course.id)
    console.log(coursesId)
    const res = await Promise.all(coursesId.map(async (course) =>
        await this.Course.findCourseUserAllByCond({ userId, courseId: course }),
      ),
    )
    console.log(...res)
    //   const coursesMas = courses.

    // return courses
  }


  async enrollmentToCourse(userId, courseId, dateStart) {
    return await this.Course.createCourseUser(userId, courseId, dateStart)
  }


}