import {
  login
} from "./login"


/**设置登录状态
 * @returns {Object:[Boolean,error]} true -> 存在用户  false -> 不存在该用户 error -> 请求出错
 */
export default async function setLoginStatus() {
  try {
    const {
      code
    } = await wx.login({});
    const {
      code: isExist,
      data
    } = await login(code)
    if (isExist && data.id) {
      wx.setStorageSync("user", data);
      return {
        isExist: true
      };
    } else {
      return {
        isExist: false
      };
    }
  } catch (error) {
    console.log(error, 'setLoginStatus:Api');
    return {error}
  }
}