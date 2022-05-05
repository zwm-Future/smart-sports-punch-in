import Request from '../request';

export const getMyTeacher = () => {
  /**
  * @param {String} semesterId - 学期id
  */
    return Request({
      url:'/stu/teacher',
    })
}

export const getTeacherCourse = () => {
  /**
  * @param {String} semesterId - 学期id
  */
    return Request({
      url:'/teacher/course',
    })
}

export const bindCourse = () => {
  /**
  * 
  * @param {String} courseId - 课程id
  */
    return Request({
      url:'/stu/bind',
    })
}