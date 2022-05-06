import Request from '../request';

export const studentLogin = (code) => {
  /**
  * @param {String} code - 登录凭证
  */
    return Request({
      url:'/user/lgoin',
      params:{code}
    })
}