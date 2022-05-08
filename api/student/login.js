import Request from '../request';

export const loginProduct = () => {
  /**
  * @param {String} code - 登录凭证
  */
    return Request({
      url:'/user/loginPsw',
      data:{number:"123"}
    })
}