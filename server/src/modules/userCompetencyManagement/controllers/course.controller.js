import { CourseService } from "../services/course.service"


const Course = new CourseService()



export const createCourse = async (req, res) => {
  try {
    const userId = req.userId

    const { courseName, durationInHours  } = req.body
    const course = await Course.createCourse({courseName, durationInHours})

    res.status(200).json( course )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const joinCourseToEquipment = async (req, res) => {
  try {

    const { courseId, equipmentId  } = req.body
    const courseEquipment = await Course.joinCourseToEquipment(courseId, equipmentId)

    res.status(200).json( courseEquipment )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const checkUserAdmission = async (req, res) => {
  try {
    const userId = req.userId

    const { equipmentId } = req.body
    const courseEquipment = await Course.checkUserAdmission(userId, equipmentId)

    res.status(200).json( courseEquipment )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const showCourseAll = async (req, res) => {
  try {

    const courses = await Course.showCourseAll()


    res.status(200).json( courses )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}

export const enrollmentToCourse = async (req, res) => {
  try {

  const userId = req.userId
    const { courseId, dateStart } = req.body

    const course = await Course.enrollmentToCourse(userId, courseId, dateStart)


    res.status(200).json( course )

  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "SMTHNG_WENT_WRONG" })
  }
}