import setLoginStatus from "./setLoginStatus";
const app = getApp();
const baseURL = app.globalData.baseUrl;
const showTip = require('../public/showTip');
export default function Request(options) {
  return new Promise((resolve, reject) => {
    showTip.Loading(1);
    if (options.url == '/user/login' || options.url == '/test/login') {
      wx.removeStorage({
        key: 'Cookie',
      })
    }
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
        const {
          statusCode,
          cookies,
          data
        } = res
        if (statusCode === 200) {
          if (options.url == '/user/login' || options.url == '/test/login') {
            let cookie = '';
            if (cookies) cookie = cookies[0].split(';')[0];
            else cookie = header["Set-Cookie"].split(';')[0];
            if (cookie != null) {
              wx.setStorageSync("Cookie", cookie); //服务器返回的Set-Cookie，保存到本地
            }
          }else if(data.code == 0) {
            setLoginStatus();
          }
          resolve(data);
        } else {
          if (statusCode == 404) {
            res.mes = '服务器出问题了，请稍后重试！'
            reject(res)
          }
        };
      },
      fail(res) {
        console.log(res, 'request:Api');
        showTip.LoadingOff();
        showTip.Toast("网络开小差了", 'error');
        reject(res);
      },
    })
  })
};