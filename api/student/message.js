import Request from '../request';

export const getMessage = () => {
  /** 获取学生消息
   * 
   */
    return Request({
      url:'/msg/course',
    })
}

export const setMesRead = (data) => {
  /** 获取学生消息
   * @param {Arr} [item] - 消息id
   */
    return Request({
      url:'/msg/course',
      method:'put',
      data
    })
}