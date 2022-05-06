import Request from '../request';
export const getAllsportRecord = (params) => {
  /** 获取某学期的各项运动的时间 + 积分
   * @param {String} semesterId - 学期id
   * @param {String} stuId - 学生id
   */
  return Request({
    url: '/sportTime/sport',
    data:params
  })
}

export const getsportRecordTotal = (params) => {
  /** 获取某学期的运动总时间 + 积分
   * @param {String} semesterId - 学期id
   * @param {String} stuId - 学生id
   */
  return Request({
    url: '/sportTime/total',
    data:params
  })
}

export const addSportRecord = () => {
  /**
   * @param {String} semesterId - 学期id
   * @param {String} stuId - 学生id
   * @param {String} sceneId	 - 场地id
   * @param {String} sportTime - 长整形 有多少秒
   * @param {String} start - 开始时间
   * @param {String} end - 结束时间
   */
  return Request({
    url: '/stu/sport',
    method: 'POST'
  })
}