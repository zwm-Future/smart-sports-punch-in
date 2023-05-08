 /**对象内是否存在属性值为空
  * @param {Object} obj - 对象
  * @return {Boolean}
  */
export const isEmpty = (obj) => {
  for(let k in obj) {
    if(obj[k]) continue;
    else return true;
  }
  return false;
}