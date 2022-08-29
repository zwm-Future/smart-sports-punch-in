import Request from '../../api/request';

export const getAllTeachers = () => {
  /** 获取所有教师
  * 
  */
    return Request({
      url:'/stu/allTeacher',
    })
}

export const getMyTeacher = (data) => {
  /** 获取我的老师
  * @param {String} semesterId - 学期id
  */
    return Request({
      url:'/stu/teacher',
      data
    })
}

export const getTeacherCourse = (data) => {
  /** 获取老师的课程
  * @param {String} semesterId - 学期id
  */
    return Request({
      url:'/teacher/course',
      data
    })
}

export const bindCourse = (data) => {
  /** 绑定课程
  * 
  * @param {String} courseId - 课程id
  */
    return Request({
      url:'/stu/bind',
      data
    })
}