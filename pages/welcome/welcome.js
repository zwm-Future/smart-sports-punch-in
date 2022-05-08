Page({
  data: {
    showAuth: false,
  },
  onLoad: async function () {
    try {
      await wx.checkSession();
      wx.switchTab({
        url: '/pages/index/index',
      })
    } catch (error) {
      console.log(error);
    }
  },
  handleShowAuth: function () {
    this.setData({
      showAuth: true
    })
  },
  authFail: function (e) {
    console.log('authFail');
    this.setData({
      showAuth: false
    }, () => {
      wx.showToast({
        title: e.detail ? e.detail : '授权失败',
        icon: 'error'
      })
    })
  }
})