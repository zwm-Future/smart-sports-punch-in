const app = getApp();
const baseURL = app.globalData.baseUrl;
const showTip = require('../public/showTip');
console.log(baseURL);
export default function Request(options) {
  return new Promise((resolve, reject) => {
    showTip.Loading(1);
    wx.request({
      url: baseURL + options.url || '',
      data: options.data || {},
      method: options.method || 'GET',
      header: options.header || {
        'content-type': "application/x-www-form-urlencoded"
      },
      responseType: options.responseType || "",
      timeout: 15000,
      success(res) {
        console.log(res);
        showTip.LoadingOff();
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          const {
            statusCode
          } = res;
          if (statusCode == 404) reject('服务器出问题了，请稍后重试！')
        };
      },
      fail(res) {
        showTip.Toast("网络开小差了");
        reject(res);
      },
      complete() {
        showTip.LoadingOff();
      }
    })
  })
};