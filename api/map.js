import Request from '../api/request';

export const getAllSportType = () => {
  /**
  * banner
  * @param {String} userId - 用户ID
  * @param {String} appClientTypeCode - 设备端类型DICT_APP_CLIENT_TYPE_CODE_ANDROID（安卓DICT_APP_CLIENT_TYPE_CODE_IOS（苹果）
  */
    return Request({
      url:'/scene/all',
    })
}

export const addArea = (name, points) => {
  /**
  * 
  * @param {String} name - 场地名称
  * @param {Array}  - 点数组
  */
    return Request({
      url:`/scene?name=${name}`,
      method:'POST',
      data:points,
      header:{'content-type': "application/json"}
    })
}

export const stayArea = (sceneId, latitude, longitude) => {
  /**
  * 
  * @param {String} sceneId - 场地ID
  * @param {String} latitude - 经度
  * @param {String} longitude - 纬度
  */
    return Request({
      url:"/sport/scene",
      data:{
        sceneId,
        latitude,
        longitude
      },
    })
}