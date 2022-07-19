import Request from '../request';

export const addCourseMes = ({content,courseId}) => {
  /** 新增课程消息
   * @param {String} content - 消息内容
   * @param {Arr} [courseId] - 课程id
   */
    return Request({
      url:`/msg/course?content=${content}`,
      method:'POST',
      data:courseId
    })
}