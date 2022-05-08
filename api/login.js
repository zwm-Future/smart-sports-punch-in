import Request from "./request.js"

export const login = (code) => {
  /**
  * @param {String} code - 登录凭证
  */
    return Request({
      url:'/user/login',
      data:{code}
    })
}