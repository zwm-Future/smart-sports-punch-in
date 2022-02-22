import {
  getAllSportType,
  addArea,
  stayArea
} from '../../api/map'
const showTip = require('../../public/showTip');

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      strokeColor: '#ccc000',
      fillColor: '#ccc00015',
      level: 'abovebuildings'
    }],
    //校区
    typeCampusArray:['大学城校区','龙洞校区'],
    //区域选择器选择值
    selectCampusIndex: 0,
    //区域选择器数组
    typeArray: [],
    //区域选择器选择值
    selectIndex: 0,
    //标记点
    markers: [],
    //新增打卡区域名称
    typeName: '',
    //模式 打卡 / 踩点
    mode: 1
  },
  //所有区域
  allArea: [],
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getAllSportType()
      .then(res => {
        //初始化位置选择
        let {
          polygons
        } = this.data;
        let typeArray = []
        let points = [];
        this.allArea = res.data;
        this.allArea.map((item, index) => {
          //初始化范围
          if (index == 0) {
            item.point.forEach((item) => {
              console.log(item);
              points.push({
                latitude: item.latitude,
                longitude: item.longitude
              });
            })
          }
          typeArray[index] = item.name;
        })
        console.log(points);
        polygons[0].points = [...points]
        this.setData({
          typeArray,
          // polygons
        })
      })
      .catch(res => {
        console.log(res);
      })
  },

  realTimeLocaton: function (res) {
    console.log(res);
    this.preLatitude = this.currentLatitude;
    this.preLongitude = this.currentLongitude;
    this.currentLatitude = res.latitude;
    this.currentLongitude = res.longitude;
  },
  bindCampusChange: function (e) {
    this.setData({
      selectCampusIndex: e.detail.value,
    })
  },
  bindPickerChange: function (e) {
    let {
      polygons
    } = this.data;
    const {
      allArea
    } = this;
    const selectIndex = e.detail.value;
    let points = [];
    allArea[selectIndex].point.forEach((item) => {
      points.push({
        latitude: item.latitude,
        longitude: item.longitude
      });
    })
    polygons[0].points = [...points]
    this.setData({
      selectIndex: e.detail.value,
      polygons
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map');
    this.mapCtx.setLocMarkerIcon({
      iconPath: '/img/map/Indicator@3x.png',
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  turnMode: function () {
    let {
      mode
    } = this.data;
    mode = mode == 1 ? 2 : 1;
    this.setData({
      mode
    })
  },
  bindBegin: function () {
    if (!this.inSide) {
      showTip.Alert('请进入区域内再开始!');
      return;
    } else {
      showTip.Alert('打卡成功!');
    }

  },

  bindInput: function (e) {
    console.log(e);
    this.setData({
      typeName: e.detail.value
    })
  },
  bindSetPoint: function () {
    let {
      markers
    } = this.data;
    const order = markers.length;
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      highAccuracyExpireTime: 5000,
      success: (res) => {
        console.log('踩点成功', res);
        let isSame = false;
        const {
          latitude,
          longitude
        } = res;
        isSame = markers.some(item => item.latitude == latitude && item.longitude == longitude);
        if (!isSame) {
          let marker = {
            id,
            latitude,
            longitude,
            order
          }
          let id = markers.length + 1;
          markers = [...markers, marker];
          this.setData({
            markers
          })
        } else {
          showTip.Alert('距离太近,请重新踩点!')
        }

      },
      fail: (res) => {
        showTip.Alert('操作太快，请稍后重试！')
      }
    })
  },
  bindSubmitPoint: function () {
    const {
      markers,
      typeName
    } = this.data;
    const name = '篮球场';
    if (markers.length < 3) {
      showTip.Alert('标记点数应不少于3个!');
      return;
    }
    if (typeName == '') {
      showTip.Alert('请输入打卡名称!');
      return;
    }
    addArea(typeName, markers)
      .then(res => {
        showTip.Alert('新增打卡区域成功');
        console.log(res);
      })
      .catch(res => {
        showTip.Alert('新增打卡区域失败');
        console.log(res);
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    wx.startLocationUpdateBackground({
      type: "gcj02",
      success: (res) => {
        console.log('前后台位置开始接收', res);
        this.sendTimer = setInterval(() => {
          if (this.preLatitude == this.currentLatitude && this.preLongitude == this.currentLongitude) return;
          console.log(111);
          stayArea(this.allArea[this.data.selectIndex].id, this.currentLatitude, this.currentLongitude)
            .then(res => {
              if (res.code == 1) {
                //修改区域颜色
                if (!this.inSide) {
                  let {
                    polygons
                  } = this.data;
                  polygons[0].strokeColor = '#44CAAC';
                  polygons[0].fillColor = '#44CAAC15';
                  this.setData({
                    polygons
                  })
                }
                this.inSide = true;
              } else {
                //修改区域颜色
                if (this.inSide) {
                  let {
                    polygons
                  } = this.data;
                  polygons[0].strokeColor = '#ccc000';
                  polygons[0].fillColor = '#ccc00015';
                  this.setData({
                    polygons
                  })
                }
                this.inSide = false;
                console.log(res.message);
              }
              console.log(222);
              this.preLatitude = this.currentLatitude;
              this.preLongitude = this.currentLongitude;
            })
        }, 1000)
        wx.onLocationChange(this.realTimeLocaton)
      },
      fail: function (res) {
        console.log('前后台位置启动失败', res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.offLocationChange(this.realTimeLocaton)
    wx.stopLocationUpdate({
      success: (res) => {
        console.log('关闭位置接收', res);
      }
    })
    clearInterval(this.sendTimer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.offLocationChange(this.realTimeLocaton)
    wx.stopLocationUpdate({
      success: (res) => {
        console.log('关闭位置接收', res);
      }
    })
    clearInterval(this.sendTimer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})