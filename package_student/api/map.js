import Request from '../../api/request';

export const getAllSportType = () => {
  /** 获取所有运动区域
   * 
   */
  return Request({
    url: '/scene/all',
  })
}
export const getCampus = () => {
     /** 获取所有校区
   * 
   */
  return Request({
    url: '/campus',
  })
}
export const addArea = (name, points) => {
  /** 新增一个场地
   * 
   * @param {String} name - 场地名称
   * @param {Array}  - 点数组
   */
  return Request({
    url: `/scene?name=${name}`,
    method: 'POST',
    data: points,
    header: {
      'content-type': "application/json"
    }
  })
}