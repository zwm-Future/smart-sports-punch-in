import pnpoly from '../../../utils/pnp.js';
import encodeTime from "../../../utils/stop"
import {
  formatTime
} from "../../../../utils/util"
import {
  addSportRecord
} from '../../../../api/sports'
const showTip = require('../../../../public/showTip.js');
Component({
  properties: {
    isOpenWxLocation: {
      type: Boolean,
      value: false,
    },
    isOpenPhonePosition: {
      type: Boolean,
      value: false
    }
  },
  data: {
    modalWxPositionVisible: false,
    modalPhonePositionVisible: false,
    // 0 不运动   1 运动中
    status: 0,
    latitude: 0,
    longitude: 0,
    //信号强度 0 -> 弱  1-> 中等 2->强
    gpsStrength: 2,
    //指定范围区域
    polygons: [{
      points: [{
        latitude: 23.03321,
        longitude: 116.29511
      }, {
        latitude: 24,
        longitude: 116.29511
      }, {
        latitude: 25.03321,
        longitude: 115.29511
      }],
      strokeWidth: 2,
      strokeColor: '#e9686b',
      fillColor: '#e9686b15',
      level: 'abovebuildings'
    }]
  },
  observers: {
    'isOpenWxLocation,isOpenPhonePosition': function (isOpenWxLocation, isOpenPhonePosition) {
      if (!isOpenWxLocation) {
        if (this.data.status == 1) {
          this.pauseCount();
        }
        this.setData({
          modalWxPositionVisible: true,
          modalPhonePositionVisible: false
        })
      } else if (!isOpenPhonePosition) {
        if (this.data.status == 1) {
          this.pauseCount();
        }
        this.setData({
          modalWxPositionVisible: false,
          modalPhonePositionVisible: true
        })
      } else if (isOpenWxLocation && isOpenPhonePosition) {
        if (this.data.status == 1) {
          this.continueCount();
        }
        this.setData({
          modalWxPositionVisible: false,
          modalPhonePositionVisible: false
        })
      } else {
        console.log('some Error---punch-map:Component');
      }
    },
  },
  //当前经纬度
  currentLatitude: 0,
  currentLongitude: 0,
  //精确度
  accuracy: 0,
  //是否在区域内
  inSide: false,
  //上一次是否在区域内
  preInSide: false,
  lock: false,
  //定时器
  sendTimer: null,
  initPoints: [],
  //小程序bug show需第二次触发才执行
  isFirst: true,
  //第一次setLocation
  isFirstSetLocation: true,
  lifetimes: {
    attached: function () {
      this.initPoints = [{
        latitude: 23.03321,
        longitude: 116.29511
      }, {
        latitude: 24,
        longitude: 116.29511
      }, {
        latitude: 25.03321,
        longitude: 115.29511
      }];
      this.currentLatitude = 0;
      this.currentLongitude = 0;
      this.accuracy = 0;
      this.inSide = false;
      this.isFirst = true;
      this.isFirstSetLocation = true;
      this.countCircle = this.selectComponent('#count-circle');
      this.wave_bg = this.selectComponent("#wave_bg");
      this.operation_tab = this.selectComponent("#operation-tab");
      this.mapCtx = wx.createMapContext('myMap', this);
      this.mapCtx.setLocMarkerIcon({
        iconPath: '/img/map/Indicator@3x.png',
        complete: e => {
          console.log(e);
        }
      });
      wx.onLocationChangeError(error => {
        console.log(error);
        //安卓：手机定位关闭
        if (error.errCode == 2) {
          const {
            isOpenPhonePosition
          } = this.properties;
          if (isOpenPhonePosition) {
            this.setData({
              isOpenPhonePosition: false,
            })
          }
        }
      }) //手机未开启定位
      wx.onLocationChange(this.realTimeLocaton.bind(this))
      //第一次代替show方法中执行_show
      if (this.isFirst) {
        this._show();
        this.isFirst = false;
      }
    },
    detached: function () {
      this.handleOnUnload()
    }
  },
  pageLifetimes: {
    show: function () {
      if (!this.isFirst) this._show();
    },
    hide: function () {
      //（运动中隐藏小程序时不要执行）
      if (this.data.status == 1) return;
      this.handleOnUnload();
    }
  },
  methods: {
    _show: function () {
      try {
        if (!this.isFirstSetLocation) this.setLocation();
        if (this.data.status == 1) return;
        this.setTimer();

      } catch (error) {
        console.log(error);
      }
    },
    //设置范围
    setRange: function (e) {
      //切换场地时 上锁
      this.lock = true;
      this.preInSide = this.inSide;
      this.inSide = false;
      const {
        points,
        callBack
      } = e.detail;
      let {
        polygons
      } = this.data;
      polygons[0].points = points.length < 3 ? this.initPoints : [...points];
      this.setData({
        polygons
      })
      callBack && callBack();
    },
    //点击打卡
    onPunch: async function ({
      detail
    }) {
      if (!this.inSide) {
        showTip.Alert('请进入区域内再开始!');
        return;
      }
      this.scene = detail.scene;
      //隐藏tarbar
      this.hideTabBar();
      //倒计时
      //这里start带参数target
      await this.wave_bg._handleCount(this.countCircle._start.bind(this.countCircle, {
        target: this.scene.minTime
      }));
      this.startTime = formatTime(new Date());
      this.setData({
        status: 1
      })
    },
    //位置监听
    realTimeLocaton: function (res) {
      //安卓：手机定位关闭 -> 打开
      if (!this.properties.isOpenPhonePosition) {
        this.setData({
          isOpenPhonePosition: true
        })
      }
      this.accuracy = res.accuracy;
      this.currentLatitude = res.latitude;
      this.currentLongitude = res.longitude;
      //第一次移动位标到屏幕中间
      if (this.isFirstSetLocation) {
        this.isFirstSetLocation = false;
        this.setLocation()
      };
    },
    //判断位置
    judgeInSide: function () {
      try {
        let {
          polygons,
          status
        } = this.data;
        const currentInSide = pnpoly(polygons[0].points, this.currentLatitude, this.currentLongitude);
        if (this.lock) {
          this.inSide = this.preInSide;
          this.lock = false;
        }
        if (currentInSide && !this.inSide) {
          polygons[0].strokeColor = '#44CAAC';
          polygons[0].fillColor = '#44CAAC15';
          this.inSide = true;
          if (status == 1) this.continueCount();
        } else if (!currentInSide && this.inSide) {
          console.log('false');
          polygons[0].strokeColor = '#e9686b';
          polygons[0].fillColor = '#e9686b15';
          this.inSide = false;
          if (status == 1) {
            this.pauseCount();
            this._setVibrateLong()
          }
        }
        this.setData({
          polygons
        })
      } catch (error) {
        console.log(error);
      }
    },
    //设置信号强度值
    setGpsStrength: function () {
      let gpsStrength = 2;
      if (this.accuracy > 100) gpsStrength = 0;
      else if (this.accuracy > 50) gpsStrength = 1;
      this.setData({
        gpsStrength
      })
    },
    _setVibrateLong: function () {
      wx.vibrateLong({
        fail: e => {
          console.log(e, '振动调用失败---punch-map:Component');
        }
      })
    },
    //屏幕移动到位置
    moveToLocation: function () {
      this.mapCtx.moveToLocation()
    },
    //出现设置当前定位
    setLocation: function () {
      showTip.LoadingOff();
      console.log('setLocation');
      showTip.Loading(false, '定位中...');
      this.setData({
        latitude: this.currentLatitude,
        longitude: this.currentLongitude,
      }, () => {
        showTip.LoadingOff();
      })
    },
    //开启定时器
    setTimer: function () {
      this.sendTimer = setInterval(() => {
        this.setGpsStrength();
        this.judgeInSide();
      }, 1000)
    },

    //继续计时
    continueCount: function () {
      // mode 0 手动暂时中  1 手动继续中
      const {
        mode
      } = this.operation_tab.data;
      if (!this.inSide || mode == 0) return;
      this.countCircle._continue();
    },
    //停止计时
    pauseCount: function () {
      this.countCircle._pause();
    },
    //结束
    end: async function () {
      try {
        //写个函数保存本地
        this.endTime = formatTime(new Date());
        const {
          startTime: start,
          endTime: end
        } = this;
        const {
          id: sceneId
        } = this.scene;
        const minAndSecond = this.countCircle._getTimes.call(this.countCircle).split(":");
        const  sportTime = minAndSecond[0] * 60 + minAndSecond[1] * 1;
        const str = encodeTime(sportTime);
        const {
          code,
        } = await addSportRecord({
          sceneId,
          sportTime,
          start,
          end,
          str
        })
        if (code) {
          sportTime >= this.scene.minTime && showTip.Toast('运动达标！', 'success');
          sportTime < this.scene.minTime && showTip.Toast('运动未达标', 'error');
        } else {
          showTip.Toast('提交失败', 'error');
          //重试
        }
        this.setData({
          status: 0
        })
        this.showTabBar();
      } catch (error) {
        console.log(error);
      }
    },
    //隐藏TarBar
    hideTabBar: function () {
      const tabbar = typeof this.getTabBar === 'function' ? this.getTabBar() : '';
      tabbar ? tabbar.setData({
        hide: true
      }) : '未知错误'
    },
    //显示TarBar
    showTabBar: function () {
      const tabbar = typeof this.getTabBar === 'function' ? this.getTabBar() : '';
      tabbar ? tabbar.setData({
        hide: false
      }) : '未知错误'
    },
    //定时器、位置接收关闭（运动中隐藏小程序时不用执行）
    handleOnUnload: function () {
      this.currentLatitude = 0
      this.currentLongitude = 0;
      wx.offLocationChange(this.realTimeLocaton);
      wx.stopLocationUpdate({
        success: (res) => {
          console.log('关闭位置接收', res);
        }
      })
      //关闭定时器
      clearInterval(this.sendTimer);
    },
    handleCancleModal: function () {
      this.setData({
        modalPhonePositionVisible: false,
        modalWxPositionVisible: false,
      })
    },
  }
})