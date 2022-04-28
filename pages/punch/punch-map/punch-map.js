import pnpoly from '../../../utils/pnp.js'
const showTip = require('../../../public/showTip.js');
Component({
  data: {
    // 0 不运动   1 运动中
    status: 0,
    latitude: 0,
    longitude: 0,
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
    }],
  },
  //当前经纬度
  currentLatitude: 0,
  currentLongitude: 0,
  //先前经纬度
  preLatitude: 0,
  preLongitude: 0,
  //是否在区域内
  inSide: false,
  //定时器
  sendTimer: null,
  lifetimes: {
    ready: function () {
      this.countCircle = this.selectComponent('#count-circle');
      this.wave_bg = this.selectComponent("#wave_bg");
      this.operation_tab = this.selectComponent("#operation-tab");
      this.mapCtx = wx.createMapContext('map');
      this.mapCtx.setLocMarkerIcon({
        iconPath: '/img/map/Indicator@3x.png',
      })
    },
    detached: function () {
     this.handleOnUnload()
    }
  },
  pageLifetimes: {
    show: function () {
      try {
        if (this.data.status == 1) reutrn;
        this.setLocation();
        this.setTimer();
        wx.onLocationChange(this.realTimeLocaton)
      } catch (error) {
        console.log(error);
      }
    },
    hide: function () {
      if (this.data.status == 1) return;
      this.handleOnUnload();
    }
  },
  methods: {
    setRange: function (e) {
      const {
        points,
        callBack
      } = e.detail;
      let {
        polygons
      } = this.data;
      polygons[0].points = [...points];
      this.setData({
        polygons
      })
      callBack && callBack();
    },
    onPunch: async function () {
      if (!this.inSide) {
        showTip.Alert('请进入区域内再开始!');
        return;
      }
      //隐藏tarbar
      this.hideTabBar();
      //倒计时
      await this.wave_bg._handleCount(this.countCircle._start.bind(this.countCircle));
      this.setData({
        status: 1
      })
    },
    realTimeLocaton: function (res) {
      this.preLatitude = this.currentLatitude;
      this.preLongitude = this.currentLongitude;
      this.currentLatitude = res.latitude;
      this.currentLongitude = res.longitude;
    },
    judgeInSide: function () {
      let {
        polygons,
        status
      } = this.data;

      const currentInSize = pnpoly(polygons[0].points, this.currentLatitude, this.currentLongitude);
      if (currentInSize && !this.inSide) {
        polygons[0].strokeColor = '#44CAAC';
        polygons[0].fillColor = '#44CAAC15';
        this.inSide = true;
        if (status == 1) this.continueCount();
      } else if (!currentInSize && this.inSide) {
        polygons[0].strokeColor = '#e9686b';
        polygons[0].fillColor = '#e9686b15';
        this.inSide = false;
        if (status == 1) this.pauseCount();
      }
      this.setData({
        polygons
      })
    },
    moveToLocation: function () {
      this.mapCtx.moveToLocation()
    },
    //出现设置当前定位
    setLocation: function () {
      showTip.Loading(false, '定位中...');
      wx.getLocation({
        type: 'gcj02',
        isHighAccuracy: true,
        highAccuracyExpireTime: 5000,
        success: (res) => {
          const {
            latitude,
            longitude
          } = res;
          this.setData({
            latitude,
            longitude
          })
          showTip.LoadingOff();
        },
        fail: (res) => {
          showTip.Alert('信号有点差，请稍后重试！')
        }
      })
    },
    //开启定时器
    setTimer: function () {
      this.sendTimer = setInterval(() => {
        try {
          this.judgeInSide();
        } catch (msg) {
          showTip.Alert(msg);
        }
      }, 1000)
    },
    //关闭定时器
    closeTimer: function () {
      clearInterval(this.sendTimer);
    },
    continueCount: function () {
      // mode 0 手动暂时中  1 手动继续中
      const {
        mode
      } = this.operation_tab.data;
      if (!this.inSide || mode == 0) return;
      this.countCircle._continue();
    },
    pauseCount: function () {
      this.countCircle._pause();
    },
    end: function () {
      this.setData({
        status: 0
      })
      this.showTabBar();
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
    handleOnUnload: function () {
      wx.offLocationChange(this.realTimeLocaton);
      clearInterval(this.sendTimer);
    }
  }
})