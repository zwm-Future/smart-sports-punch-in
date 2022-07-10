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
        'Cookie': wx.getStorageSync("Cookie") //读取本地保存好的上一次cookie
      },
      responseType: options.responseType || "",
      timeout: 15000,
      success(res) {
        showTip.LoadingOff();
        if (res.statusCode === 200) {
          if (options.url == '/user/login' || options.url == '/test/login') {
            console.log(res);
            let cookie = '';
            if(res.cookies) cookie = res.cookies[0].split(';')[0];
            else cookie = res.header["Set-Cookie"].split(';')[0];
            console.log(cookie);
            // console.log(res.header["Set-Cookie"]);
            // console.log(res.header["Set-Cookie"].split(';'))
            if (cookie != null) {
              wx.setStorageSync("Cookie", cookie); //服务器返回的Set-Cookie，保存到本地
            }
          }
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