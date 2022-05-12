Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
    }
  },
  data: {
    dragX: '0',
    pic: '',
    l: 0,
    canvasHeight: 0,
    top: 0,
    dragLeft: 0,
    statusClass: ''
  },
  finalX: '0',
  canvasBox: null,
  lifetimes: {
    attached: function () {
      let _this = this;
      this.createSelectorQuery()
        .select("#vf")
        .context(function (res) {
          _this.canvasBox = res.context;
          _this.initCanvas()
        })
        .exec();
    }
  },
  methods: {
    end: function (e) {
      if (this.finalX < this.data.left + 5 && this.finalX > this.data.left - 5) {
        this.setData({
          statusClass: 'success'
        }, () => {
          this.triggerEvent("handleSuccess")
        })
        return
      }
      this.setData({
        dragX: '0',
        statusClass: 'shake'
      })
    },
    drag: function (e) {
      //防抖
      this.finalX = e.detail.x;
      if (this.finalX <= 1) this.setData({
        statusClass: ''
      })
    },
    initCanvas: function () {
      let rpx;
      const that = this;
      wx.getSystemInfo({
        success: function (res) {
          rpx = res.windowWidth / 375;
          console.log(rpx);
        },
      })
      const canvasHeight = 150 * rpx
      this.setData({
        canvasHeight
      })
      this.canvasBox.drawImage('/img/index/src=http___newsletter.teldap.tw_file_file_75_7599.jpg&refer=http___newsletter.teldap.webp', 0, 0, 300 * rpx, canvasHeight)
      const l = 50 * rpx;
      const left = 150 * rpx;
      const top = 50 * rpx;
      this.canvasBox.draw(false, setTimeout(() => {
        wx.canvasToTempFilePath({
          x: left,
          y: top,
          width: l,
          height: l,
          destWidth: l,
          destHeight: l,
          canvasId: 'vf',
          fileType: 'png',
          success(res) {
            console.log(canvasHeight);
            console.log(res.tempFilePath)
            that.setData({
              pic: res.tempFilePath,
              l,
              top,
              left
            })
          },
          fail: err => {
            console.log(err)
          }
        }, this)
      }, 500))
    }
  }
})