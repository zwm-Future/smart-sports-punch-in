import {
  getAllSportType,
  addArea,
  stayArea
} from '../../api/map'
import pnpoly from '../../utils/pnp.js'
const showTip = require('../../public/showTip');

Page({
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
    //标记点
    // markers: [],
    //新增打卡区域名称
    typeName: '',
    //模式 打卡 / 踩点
    mode: 2
  },
  //当前经纬度
  currentLatitude: 0,
  currentLongitude: 0,
  //先前经纬度
  preLatitude: 0,
  preLongitude: 0,
  //是否在区域内
  inSide: false,
  //正在打卡
  isBegin: false,
  //定时器
  sendTimer: null,

  onLoad: function (options) {

  },

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
  onReady: function () {
    this.countCircle = this.selectComponent('#count-circle');
    this.wave_bg = this.selectComponent("#wave_bg");
    this.operation_tab = this.selectComponent("#operation-tab");
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.setLocMarkerIcon({
      iconPath: '/img/map/Indicator@3x.png',
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  // turnMode: function () {
  //   let {
  //     mode
  //   } = this.data;
  //   mode = mode == 1 ? 2 : 1;
  //   this.setData({
  //     mode
  //   })
  // },

  // bindInput: function (e) {
  //   console.log(e);
  //   this.setData({
  //     typeName: e.detail.value
  //   })
  // },
  // bindSetPoint: function () {
  //   let {
  //     markers
  //   } = this.data;
  //   const order = markers.length;
  //   showTip.Loading(false,'踩点中，请稍后...');
  //   wx.getLocation({
  //     type: 'gcj02',
  //     isHighAccuracy: true,
  //     highAccuracyExpireTime: 5000,
  //     success: (res) => {
  //       console.log('踩点成功', res);
  //       let isSame = false;
  //       const {
  //         latitude,
  //         longitude
  //       } = res;
  //       isSame = markers.some(item => item.latitude == latitude && item.longitude == longitude);
  //       if (!isSame) {
  //         let marker = {
  //           id,
  //           latitude,
  //           longitude,
  //           order
  //         }
  //         let id = markers.length + 1;
  //         markers = [...markers, marker];
  //         this.setData({
  //           markers
  //         })
  //       } else {
  //         showTip.Alert('距离太近,请重新踩点!')
  //       }
  //       showTip.LoadingOff()
  //     },
  //     fail: (res) => {
  //       showTip.Alert('操作太快，请稍后重试！')
  //     }
  //   })
  // },
  // bindSubmitPoint: function () {
  //   const {
  //     markers,
  //     typeName
  //   } = this.data;
  //   const name = '篮球场';
  //   if (markers.length < 3) {
  //     showTip.Alert('标记点数应不少于3个!');
  //     return;
  //   }
  //   if (typeName == '') {
  //     showTip.Alert('请输入打卡名称!');
  //     return;
  //   }
  //   addArea(typeName, markers)
  //     .then(res => {
  //       showTip.Alert('新增打卡区域成功');
  //       console.log(res);
  //     })
  //     .catch(res => {
  //       showTip.Alert('新增打卡区域失败');
  //       console.log(res);
  //     })
  // },

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

  getTry: function () {
    //引导用户开启定位
    console.log(123);
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
  onShow: function () {
    //tarbar切换
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

    if (this.data.status == 0)
      //开启持续定位
      wx.startLocationUpdateBackground({
        type: "gcj02",
        success: (res) => {
          console.log('前后台位置开始接收', res);
          this.setLocation();
          this.setTimer();
          wx.onLocationChange(this.realTimeLocaton)
        },
        fail: (res) => {
          this.getTry();
          console.log('前后台位置启动失败', res);
        }
      })
  },

  onHide: function () {
    if (this.data.status == 1) return;
    wx.offLocationChange(this.realTimeLocaton)
    wx.stopLocationUpdate({
      success: (res) => {
        console.log('关闭位置接收', res);
      }
    })
    clearInterval(this.sendTimer);
  },

  onUnload: function () {},
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
})