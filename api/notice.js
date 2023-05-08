import Request from "./request.js"

export const getTextNotice = () => {
  /**获取文字公告
   * 
   */
  return Request({
    url: `/ann?type=${'text'}`,
  })
}

export const getImgNotice = () => {
  /**获取图片公告
   * 
   */
  return Request({
    url: `/ann?type=${'imag'}`,
  })
}