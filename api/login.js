import Request from "./request.js"

export const login = (code) => {
  /**微信授权登录
   * @param {String} code - 登录凭证
   */
  return Request({
    url: '/user/login',
    data: {
      code
    }
  })
}

export const loginPsw = (number, password, code, weChatCode) => {
  /** 账号密码登录
   * @param {String} number - 学工号
   * @param {String} password - 密码
   * @param {String} code - wxCode
   * @param {String} weChatCode - 登录验证码
   */
  return Request({
    url: `/user/loginPsw?code=${code}&weChatCode=${weChatCode}`,
    method: 'POST',
    data: {
      number,
      password
    }
  })
}

export const loginProduct = (number) => {
  /** 测试账号登录
   * @param {Number} number - 123 -> 学生测试号 312-> 教师测试 
   */
  return Request({
    url: '/test/login',
    data: {
      number
    }
  })
}