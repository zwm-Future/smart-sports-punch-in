Page({
  data: {
    showAuth: false,
  },
  onLoad: function () {
    //Prodcut -> 放开 this.product 注释 wx.getShareInfo({
    this.product();
    // wx.getUserInfo({
    //   withCredentials: true,
    //   lang: 'zh_CN',
    //   success: (res) => {
    //     if(res.encryptedData && res.iv) {
    //       wx.switchTab({
    //         url: '/pages/index/index',
    //       })
    //     }
    //   }
    // })
  },
  handleShowAuth: function () {
    this.setData({
      showAuth: true
    })
  },
  //Product Login
  product: function () {
    const app = getApp()
    wx.request({
      url: app.globalData.baseUrl + '/user/loginPsw?number=123',
      success: (res) => {
        const {code,data} = res.data;
        const app = getApp()
        if(code) app.globalData.user = data;
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    })
  }
})