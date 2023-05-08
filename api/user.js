import Request from "./request.js"

export const modifyPsw = ({oldPsw,newPsw}) => {
  /**修改密码
   * @param {String} oldPsw - 旧密码
   * @param {String} newPsw - 新密码
   */
  return Request({
    url: '/user/psw',
    method:'POST',
    data: {
      oldPsw,
      newPsw
    }
  })
}