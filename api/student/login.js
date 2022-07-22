import Request from '../request';

export const loginProduct = (number) => {
  /**
  * @param {String} code - 登录凭证
  */
    return Request({
      url:'/test/login',
      data:{number}
    })
}