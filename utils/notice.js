/**
 *  这是处理文字公告和通知公告页的逻辑合在一块 不重复写 
 * 
 * 
 */

import {
  getTextNotice
} from "../api/notice"

export const getTextNoticeList = async function () {
  try {
    const {
      code,
      data
    } = await getTextNotice();
    if (code) {
      this.setData({
        textList: data
      })
    } else {
      console.log('code 0-notice:utils');
    }
  } catch (error) {
    console.log(error, "notice:");
  }
}

export const handleTapText = function ({
  currentTarget: {
    dataset: {
      textIndex
    }
  }
}) {
  const {
    title,
    content,
    date,
    author
  } = this.data.textList[textIndex];
  wx.navigateTo({
    url: `/pages/notice-text-view/notice-text-view?title=${encodeURIComponent(title)}&content=${encodeURIComponent(content)}&date=${encodeURIComponent(date)}&author=${encodeURIComponent(author)}`,
  })
}