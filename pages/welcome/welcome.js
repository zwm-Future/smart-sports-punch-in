import setLoginStatus from "../../api/setLoginStatus";
import {loginProduct} from "../../api/login"
const app = getApp();
Page({
  data: {
    showAuth: false,
  },
  onLoad: async function () {
    try {
      this.getSystem();
    } catch (error) {
      console.log(error);
    }
  },
  onShow() {
    this.tryLogin();
    // Product ⬇
    // this.textLogin();
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
  //Product
  textLogin: async function () {
    try {
      const {
        code: loginCode,
        data
      } = await loginProduct('321'); //123 -> student   321 -> teacger
      if (loginCode) {
        wx.setStorageSync("user", data);
        app.globalData.identityId = data.identityId;
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    } catch (error) {
      console.log('welcome:Page', error);
    }
  },
  tryLogin: async function () {
    try {
      if (!wx.getStorageSync('userInfo')) return;
      const {isExist,error} = await setLoginStatus();
      console.log(isExist,error);
      if(error) return;
      if (isExist) {
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
  },
  getSystem: function () {
    const info = wx.getSystemInfoSync();
    app.globalData.systemInfo = info;
  }
})