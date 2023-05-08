// pages/message-view/message-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nodes: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      content
    } = options;
    //空格不解析 转为&nbsp;
    let result = decodeURIComponent(content)
    result = result.replace(/ /g, '\xa0');
    this.setData({
      nodes: result
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})