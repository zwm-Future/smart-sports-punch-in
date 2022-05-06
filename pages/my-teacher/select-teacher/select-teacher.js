// pages/my-teacher/select-teacher/select-teacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.login({
      timeout: 1000,
      success: (res) => {
        console.log(res);
        // wx.request({
        //   url: `https://www.bingcoke.com/sport/user/reAndLogin?name=${'猪小明'}&number=3120004860&identityId=1&password=123456&code=${res.code}`,
        //   method:'POST',
        //   success:(r) => {
        //     console.log(r);
        //   }
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  search: function (e) {
    console.log(e);
    //官方自定义组件返回值 require
    return new Promise((resolve, reject) => {})
  },
})