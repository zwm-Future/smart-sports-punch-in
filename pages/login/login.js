import {
  isEmpty
} from "../../utils/filter"
import {
  loginPsw
} from "../../api/login"
import {Toast} from "../../public/showTip"
const app = getApp();
const baseURL = app.globalData.baseUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: ``
  },
  onShow() {
    this.refreshVetifyCode();
  },
  refreshVetifyCode: function () {
    wx.downloadFile({
      url: `${baseURL}/user/getCode?id=${Date.now()}`,
      success: (res) => {
        console.log(res);
        if (res.statusCode == 200) {
          const cookie = res.cookies[0].split(';')[0];
          console.log(cookie);
          if (cookie != null) {
            wx.setStorageSync("Cookie", cookie); //服务器返回的Set-Cookie，保存到本地
          }
          this.setData({
            imgSrc: res.tempFilePath
          })
        }
      },
      error: (res) => {
        console.log(res);
      }
    })
  },
  handleSubmit: async function (e) {
    try {
      const data = e.detail.value;
      if (!isEmpty(data)) {
        const {
          number,
          password,
          code
        } = data;
        const {
          code: weChatCode
        } = await wx.login({});
        const {
          code: loginPswCode,
          message
        } = await loginPsw(number, password, code, weChatCode);
        if (loginPswCode) { //注册完成 （登录）
          wx.removeStorageSync('Cookie');
          wx.redirectTo({
            url: '/pages/welcome/welcome',
          })
        } else { //信息错误
          Toast(message,'error')
          this.refreshVetifyCode();

        }
      }
    } catch (error) {
      console.log(error, '---login:Page');
    }
  },
  turnIdentity:function({target}) {
    const {dataset:{mode}} = target;
    if(!mode) return;
    if(mode == 2) Toast('维护中...','none');
  }
})