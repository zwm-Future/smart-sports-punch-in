import Request from '../../api/request';
export const getMyStudents = (data) => {
  /**获取老师的课程下的学生
  * @param {String} courseId - 课程id
  */
    return Request({
      url:'/teacher/stu',
      data
    })
}