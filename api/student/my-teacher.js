import Request from '../request';

export const getAllTeachers = () => {
  /**
  * 
  */
    return Request({
      url:'/stu/allTeacher',
    })
}

export const getMyTeacher = (data) => {
  /**
  * @param {String} semesterId - 学期id
  */
    return Request({
      url:'/stu/teacher',
      data
    })
}

export const getTeacherCourse = (data) => {
  /**
  * @param {String} semesterId - 学期id
  */
    return Request({
      url:'/teacher/course',
      data
    })
}

export const bindCourse = (data) => {
  /**
  * 
  * @param {String} courseId - 课程id
  */
    return Request({
      url:'/stu/bind',
      data
    })
}