import pnpoly from '../../../utils/pnp.js';
import {
  formatTime
} from "../../../../utils/util"
import {
  addSportRecord
} from '../../../../api/sports'
const showTip = require('../../../../public/showTip.js');
Component({
  properties: {
    isOpenLocation: {
      type: Boolean,
      value: false,
      observer: function (value) {
        if (value) {
          this.setLocation()
        }
      }
    }
  },
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
    target: 120
  },
  //当前经纬度
  currentLatitude: 0,
  currentLongitude: 0,
  //是否在区域内
  inSide: false,
  //上一次是否在区域内
  preInSide: false,
  lock: false,
  //定时器
  sendTimer: null,
  initPoints: [],
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
      this.inSide = false;
      this.countCircle = this.selectComponent('#count-circle');
      this.wave_bg = this.selectComponent("#wave_bg");
      this.operation_tab = this.selectComponent("#operation-tab");
      this.mapCtx = wx.createMapContext('myMap', this);
      this.mapCtx.setLocMarkerIcon({
        iconPath: '/img/map/Indicator@3x.png',
      });
    },
    detached: function () {
      this.handleOnUnload()
    }
  },
  pageLifetimes: {
    show: function () {
      try {
        //已开启后台定位？ -> 定位
        if (this.properties.isOpenLocation) this.setLocation();
        if (this.data.status == 1) reutrn;
        this.setTimer();
        wx.onLocationChangeError(res => console.log(res))
        wx.onLocationChange(this.realTimeLocaton.bind(this))
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
      await this.wave_bg._handleCount(this.countCircle._start.call(this.countCircle));
      this.startTime = formatTime(new Date());
      this.setData({
        status: 1,
        target: this.scene.minTime
      })
    },
    //位置监听
    realTimeLocaton: function (res) {
      this.currentLatitude = res.latitude;
      this.currentLongitude = res.longitude;
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
          if (status == 1) this.pauseCount();
        }
        this.setData({
          polygons
        })
      } catch (error) {
        console.log(error);
      }
    },
    //屏幕移动到位置
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
          // showTip.Alert('信号有点差，请稍后重试！')
        }
      })
    },
    //开启定时器
    setTimer: function () {
      this.sendTimer = setInterval(() => {
        this.judgeInSide();
      }, 1000)
    },
    //关闭定时器
    closeTimer: function () {
      clearInterval(this.sendTimer);
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
      console.log('pause');
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
        const sportTime = minAndSecond[0] * 60 + minAndSecond[1] * 1;
        const {code,} = await addSportRecord({
          sceneId,
          sportTime,
          start,
          end
        })
        if(code) {
          sportTime >= this.scene.minTime && showTip.Toast('运动达标！','success');
          sportTime < this.scene.minTime && showTip.Toast('运动未达标','error');
        }else {
          showTip.Toast('提交失败','error');
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
    //处理页面隐藏
    handleOnUnload: function () {
      wx.offLocationChange(this.realTimeLocaton);
      clearInterval(this.sendTimer);
    }
  }
})