import Request from '../request';

export const getAllsportRecord = () => {
  /**
  * @param {String} semesterId - 学期id
  * @param {String} stuId - 学生id
  */
    return Request({
      url:'/sportTime/sport',
    })
}

export const getsportRecordTotal = () => {
  /**
  * @param {String} semesterId - 学期id
  * @param {String} stuId - 学生id
  */
    return Request({
      url:'/sportTime/total',
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
      url:'/stu/sport',
      method:'POST'
    })
}