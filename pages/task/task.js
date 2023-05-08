// pages/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },


  onLoad: function (options) {

  },

  onReady: function () {},

  onShow: function () {

  },
  showWave: function () {
    const cp = this.selectComponent('#wave_bg')
    cp._handleCount();
  },
  onUnload: function () {},
  handleCountEnd: function () {
    console.log(111);
  }

})