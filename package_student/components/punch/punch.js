Component({
  data: {
    isOpenWxLocation: true,
    isOpenPhonePosition: true,
  },
  methods: {
    _getTryOpenWxPosition: function () {
      wx.getSetting({
        withSubscriptions: false,
        success: (res) => {
          const {
            authSetting
          } = res
          if (authSetting["scope.userLocation"] && authSetting["scope.userLocationBackground"]) return;
          //引导用户开启定位
          this.setData({
            modalWxPositionVisible: true,
          })
        },
        fail: (res) => {
          console.log(res);
        }
      })
    },
    _getTryOpenPhonePosition: function () {
      this.setData({
        modalPhonePositionVisible: true,
      })
    },

    openPosition: function () {
      //开启持续定位
      wx.startLocationUpdateBackground({
        type: "gcj02",
        success: (res) => {
          console.log('前后台位置开始接收', res);
          this.setData({
            isOpenWxLocation: true,
            isOpenPhonePosition: true,
          })
        },
        fail: ({
          errMsg
        }) => {
          console.log(errMsg);

          if (errMsg == 'startLocationUpdateBackground:fail auth deny') {
            // this._getTryOpenWxPosition();
            this.setData({
              isOpenWxLocation: false,
            })
            //苹果在定位未开启时会出现下面这个，安卓不会
          } else if (errMsg == 'startLocationUpdateBackground:fail system permission denied') {
            // this._getTryOpenPhonePosition();
            this.setData({
              isOpenWxLocation: true,
              isOpenPhonePosition: false
            })
          } else console.log(errMsg, '---punch:Component');
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
      // wx.stopLocationUpdate({
      //   success: (res) => {
      //     console.log('关闭位置接收', res);
      //   }
      // })
      // clearInterval(this.sendTimer);
    }
  }
})