const app = getApp();
const baseURL = app.globalData.baseUrl;
const showTip = require('../public/showTip');
console.log(baseURL);
export default function  Request(options){
  return new Promise((resolve, reject) => {
    // showTip.Loading(1);
    wx.request({
      url: baseURL + options.url || '',
      data: options.data || {},
      method: options.method || 'GET',
      header:options.header || {'content-type': "application/x-www-form-urlencoded"},
      responseType:options.responseType || "",
      timeout:15000,
      success (res) {
        showTip.LoadingOff();
        if(res.statusCode === 200){
            resolve(res.data);
        }else{
          showTip.Toast(res.errMsg);
        };
      },
      fail (res) {
        showTip.Toast("网络开小差了");
        reject(res);
      }
    })
  })
};