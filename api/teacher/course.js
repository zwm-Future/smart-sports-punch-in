import Request from '../request';
export const getTeacherCourse = (data) => {
  /**获取老师的课程
  * @param {String} semesterId - 学期id
  * @param {String} teacherId - 老师id
  */
    return Request({
      url:'/teacher/course',
      data
    })
}