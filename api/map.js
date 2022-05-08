import Request from '../api/request';

export const getAllSportType = () => {
  return Request({
    url: '/scene/all',
  })
}
export const getCampus = () => {
  return Request({
    url: '/campus',
  })
}
export const addArea = (name, points) => {
  /**
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