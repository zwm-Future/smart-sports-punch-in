import {getTextNoticeList,handleTapText} from "../../utils/notice"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textList:[]
  },
  onReady: function () {
    getTextNoticeList.call(this);
  },
  tapText:function(e) {
    handleTapText.call(this,e);
  }
})