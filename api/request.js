const app = getApp();
const baseURL = app.globalData.baseUrl;
const showTip = require('../public/showTip');
export default function Request(options) {
  return new Promise((resolve, reject) => {
    showTip.Loading(1);
    wx.request({
      url: baseURL + options.url || '',
      data: options.data || {},
      method: options.method || 'GET',
      header: {
        "Access-Control-Allow-Origin": "*",
      },
      responseType: options.responseType || "",
      timeout: 15000,
      success(res) {
        showTip.LoadingOff();
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          const {
            statusCode
          } = res;
          if (statusCode == 404) {
            res.mes = '服务器出问题了，请稍后重试！'
            reject(res)
          }
        };
      },
      fail(res) {
        showTip.LoadingOff();
        showTip.Toast("网络开小差了");
        reject(res);
      },
    })
  })
};