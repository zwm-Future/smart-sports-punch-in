Page({
  data: {
    modalVisible: false,
    isOpenLocation:false,
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    //tarbar切换
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    //开启持续定位
    wx.startLocationUpdateBackground({
      type: "gcj02",
      success: (res) => {
        console.log('前后台位置开始接收', res);
        this.setData({
          isOpenLocation:true
        })
      },
      fail: (res) => {
        this.getTry();
      }
    })
  },
  onHide: function () {
    // if (this.data.status == 1) return;
    // wx.offLocationChange(this.realTimeLocaton)
    wx.stopLocationUpdate({
      success: (res) => {
        console.log('关闭位置接收', res);
      }
    })
    // clearInterval(this.sendTimer);
  },
  onUnload: function () {},
  getTry: function () {
    wx.getSetting({
      withSubscriptions: false,
      success: (res) => {
        const {
          authSetting
        } = res
        if (authSetting["scope.userLocation"] && authSetting["scope.userLocationBackground"]) return;
        //引导用户开启定位
        this.setData({
          modalVisible: true,
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  handleCancleModal: function () {
    this.setData({
      modalVisible: false
    })
  },
})