import {
  login
} from '../../api/login.js'
Page({
  data: {
    showAuth: false,
  },
  onLoad: async function () {
    try {
      // await wx.checkSession();
      // wx.switchTab({
      //   url: '/pages/index/index',
      // })
      this.textLogin();
    } catch (error) {
      console.log(error);
    }
  },
  onShow() {
    this.textLogin();
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
  },
  textLogin: async function () {
    try {
      if (!wx.getStorageSync('userInfo')) return;
      const {
        code
      } = await wx.login({});
      const {
        code: isExist,
        data
      } = await login(code)
      if (isExist) {
        wx.setStorageSync("user", data);
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else {
        wx.redirectTo({
          url: '/pages/login/login',
        })
      }
    } catch (error) {
      console.log('welcome:Page', error);
    }
  }
})