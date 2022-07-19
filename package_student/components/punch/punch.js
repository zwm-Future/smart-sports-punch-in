// package_student/components/punch/punch.js
Component({
  data: {
    modalVisible: false,
    isOpenLocation: false,
  },
  methods: {
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
    openPosition: function () {
      //开启持续定位
      wx.startLocationUpdateBackground({
        type: "gcj02",
        success: (res) => {
          console.log('前后台位置开始接收', res);
          this.setData({
            isOpenLocation: true
          })
        },
        fail: (res) => {
          this.getTry();
        }
      })
    }
  },
  lifetimes: {
    attached() {
      this.openPosition();
      console.log('punch--attached');
    },
    detached() {
      console.log('punch--detached');
    }
  },
  pageLifetimes: {
    show() {
      this.openPosition();
    },
    hide() {
      // if (this.data.status == 1) return;
      // wx.offLocationChange(this.realTimeLocaton)
      wx.stopLocationUpdate({
        success: (res) => {
          console.log('关闭位置接收', res);
        }
      })
      // clearInterval(this.sendTimer);
    }
  }
})