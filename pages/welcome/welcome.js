Page({
  data: {
    showAuth:false
  },
  onLoad: function () {
    wx.getSystemInfo({
      success: (result) => {
        console.log(result);
      },
    })
    wx.getUserInfo({
      withCredentials:true,
      lang:'zh_CN',
      success:(res) => {
        console.log(res);
      }
    })
  },
})