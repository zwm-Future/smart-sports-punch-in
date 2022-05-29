import Request from "./request.js"

export const getAllSemesters = () => {
  /**
  * @param {String} code - 登录凭证
  */
    return Request({
      url:'/semester/all',
    })
}