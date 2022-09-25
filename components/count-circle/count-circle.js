import encodeTime from "../../utils/stop";
import {
  formatTime
} from "../../utils/util";
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
    // verifyShow: false,
  },
  // timer: null,
  // count: 0,
  //已调用缓存次数
  //storageTimes
  // //步数
  // stepNum: 0,
  // //当前步数
  // currentStep: 0,
  // //步长
  // step: 0,
  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function () {
      //初始化
      this.storageTimes = 0;
      this.count = 0;
      this.timer = null;
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
    //target 目标值
    _start: function ({
      target = 1200,
      sceneId
    }) {

      this.count = 0;
      this.target = target;
      this.sceneId = sceneId;
      this.start = formatTime(new Date());
      // this.stepNum = 12;
      // console.log(target);
      // this.step = parseInt(target / this.stepNum);
      // console.log(this.step);
      // this.currentStep = 0;
      this.setData({
        times: '00:00',
        value: 0
      })
      clearInterval(this.timer);
      console.log('sceneId', sceneId);
      console.log('_start____');
      this.timer = setInterval(this._timerFunc.bind(this), 1000);
    },
    _pause: function () {
      console.log('_pause');
      clearInterval(this.timer);
    },
    _continue: function () {
      clearInterval(this.timer);
      console.log('_continue');
      this.timer = setInterval(this._timerFunc.bind(this), 1000);
    },
    _getTimes: function () {
      return this.data.times;
    },
    _countToTimes: function (count) {
      let seconds = count % 60;
      let minutes = (count - seconds) / 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return minutes + ':' + seconds;
    },
    _timerFunc: function () {
      const {
        value
      } = this.data
      this.count++;
      //以步长增加
      // if (parseInt(this.count / this.step) == this.currentStep + 1 && this.currentStep <= this.stepNum) {
      //   //打卡验证
      //   // if (this.properties.verify && this.currentStep * 2 == this.stepNum) {
      //   //   console.log(this.currentStep, this.stepNum);
      //   //   this._pause();
      //   //   this.setData({
      //   //     verifyShow: true
      //   //   })
      //   // }
      //   this.currentStep++;
      //   const value = this.currentStep * parseInt((100 / this.stepNum));
      //   console.log(value);
      //   this.setData({
      //     value
      //   })
      // }
      if ((this.target / 10) * (((value + 10) / 10)) < this.count) {
        this.setData({
          value: value + 10
        });
      }
      const times = this._countToTimes(this.count);
      this._storageFunc();
      this.setData({
        times,
      });
    },
    // cancleVerify: function () {
    //   this._continue()
    //   this.setData({
    //     verifyShow: false
    //   })
    // }
    _storageFunc: function () {
      //超过目标的一半才缓存
      if (this.count >= this.target / 2 && this.count < (this.storageTimes + 1) * 30) return;
      //缓存 运动时长，   运动场地id， 开始时间， 结束时间
      wx.setStorageSync('str', `${encodeTime(this.count)},${this.sceneId},${this.start},${formatTime(new Date())}`);
      this.storageTimes++;
    }
  },
})