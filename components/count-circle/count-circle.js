Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    //圆圈直径
    size: {
      type: String,
      value: 100
    },
    //圆圈宽度
    strokeWidth: {
      type: String,
      value: 20
    },
    //目标值
    target: {
      type: String,
      value: 120
    },
    //是否需要验证
    verify: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sizeRpx: 50,
    strokeWidthRpx: 10,
    value: 0,
    times: '00:00',
    verifyShow: false,
  },
  timer: null,
  count: 0,
  //步数
  stepNum: 0,
  //当前步数
  currentStep: 0,
  //步长
  step: 0,
  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function () {
      //适配
      wx.getSystemInfo({
        success: (result) => {
          const rpx = result.screenWidth / 750;
          this.setData({
            sizeRpx: this.properties.size * rpx,
            strokeWidthRpx: this.properties.strokeWidth * rpx
          })
        },
      })
    }
  },
  methods: {
    _start: function () {
      this.count = 0;
      this.stepNum = 12;
      this.step = parseInt(this.properties.target / this.stepNum);
      console.log(this.step);
      this.currentStep = 0;
      this.setData({
        times: '00:00'
      })
      clearInterval(this.timer);
      this.timer = setInterval(this._timerFunc.bind(this), 1000)
    },
    _pause: function () {
      clearInterval(this.timer);
    },
    _continue: function () {
      clearInterval(this.timer);
      this.timer = setInterval(this._timerFunc.bind(this), 1000)
    },
    _getTimes: function () {
      return this.data.times;
    },
    _countToTimes: function (count) {
      let seconds = count % 60;
      let minutes = parseInt(count / 60);
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return minutes + ':' + seconds;
    },
    _timerFunc: function () {
      this.count++;
      //以步长增加
      if (parseInt(this.count / this.step) == this.currentStep + 1 && this.currentStep <= this.stepNum) {
        //打卡验证
        if (this.properties.verify && this.currentStep * 2 == this.stepNum) {
          console.log(this.currentStep, this.stepNum);
          this._pause();
          this.setData({
            verifyShow: true
          })
        }
        this.currentStep++;
        const value = this.currentStep * parseInt((100 / this.stepNum));
        console.log(value);
        this.setData({
          value
        })
      }
      const times = this._countToTimes(this.count);
      this.setData({
        times
      });
    },
    cancleVerify: function () {
      this._continue()
      this.setData({
        verifyShow: false
      })
    }
  }
})