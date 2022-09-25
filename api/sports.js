import Request from './request';
export const getAllsportRecord = (params) => {
  /** 获取某学期的各项运动的最近时间 + 积分
   * @param {String} semesterId - 学期id
   * @param {String} stuId - 学生id
   */
  return Request({
    url: '/sportTime/sport',
    data: params
  })
}

export const getsportRecordTotal = (params) => {
  /** 获取某学期的运动总时间 + 积分
   * @param {String} semesterId - 学期id
   * @param {String} stuId - 学生id
   */
  return Request({
    url: '/sportTime/total',
    data: params
  })
}

export const getAllsportRecordDetail = (params) => {
  /** 获取某学期的各项运动的详情
   * @param {String} semesterId - 学期id
   * @param {String} stuId - 学生id
   */
  return Request({
    url: '/sportTime/semester',
    data: params
  })
}

export const getOneSportRecordDetail = (params) => {
  /** 获取某学期的某种运动的详情
   * @param {String} semesterId - 学期id
   * @param {String} sportId - 运动id
   * @param {String} stuId - 学生id
   */
  return Request({
    url: '/sportTime/sportExact',
    data: params
  })
}

export const getTodaysportRecord = (params) => {
  /** 获取今天的运动时间 + 积分
   * @param {String} userId - 学生id
   */
  return Request({
    url: '/sportTime/now',
    data: params
  })
}

export const getRecentlysportRecord = ({stuId,semesterId}) => {
  /** 获取最近的运动时间
   * @param {String} stuId - 学生id
   * @param {String} semesterId - 学期id
   */
  return Request({
    url: '/sportTime/recently',
    data: {stuId,semesterId}
  })
}

export const addSportRecord = ({
  sceneId,
  sportTime,
  start,
  end,
  str
}) => {
  /** 新增运动记录
   * @param {String} sceneId	 - 场地id
   * @param {String} sportTime - 长整形 有多少秒
   * @param {String} start - 开始时间
   * @param {String} end - 结束时间
   * @param {String} str - 密钥
   */
  return Request({
    url: `/stu/sport?str=${str}`,
    method: 'POST',
    data: {
      "sceneId": sceneId,
      "sportTime": sportTime,
      "start": start,
      "end": end
    }
  })
}

export const getAllSports = () => {
  /** 获取所有的运动项目
   */
  return Request({
    url: '/sport',
    method: 'GET'
  })
}