import Request from "./request.js"

export const login = (code) => {
  /**微信授权登录
  * @param {String} code - 登录凭证
  */
    return Request({
      url:'/user/login',
      data:{code}
    })
}

export const loginPsw = (number,password,code,weChatCode) => {
  /** 账号密码登录
  * @param {String} number - 学工号
  * @param {String} password - 密码
  * @param {String} code - 登录验证码
  * @param {String} weChatCode - 登录验证码
  */
    return Request({
      url:`/user/loginPsw?code=${code}&weChatCode=${weChatCode}`,
      method:'POST',
      data:{
        number,
        password
      }
    })
}