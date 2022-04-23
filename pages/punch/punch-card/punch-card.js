// 所有区域
let allArea = [];

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    //校区
    typeCampusArray: ['大学城校区', '龙洞校区'],
    //区域选择器选择值
    selectCampusIndex: 0,
    //区域选择器数组
    typeArray: [],
    //区域选择器选择值
    selectIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindCampusChange: function (e) {
      this.setData({
        selectCampusIndex: e.detail.value,
      })
    },
    bindPickerChange: function (e) {
      // let {
      //   polygons
      // } = this.data;
      // const {
      //   allArea
      // } = this;
      // const selectIndex = e.detail.value;
      // let points = [];
      // allArea[selectIndex].point.forEach((item) => {
      //   points.push({
      //     latitude: item.latitude,
      //     longitude: item.longitude
      //   });
      // })
      // polygons[0].points = [...points]
      // this.setData({
      //   selectIndex: e.detail.value,
      //   polygons
      // })
    },
    bindBegin: function () {
      //触发父 function
      this.triggerEvent('handlePunch');
      // if (!this.inSide) {
      //   showTip.Alert('请进入区域内再开始!');
      //   return;
      // } else {
      //   showTip.Alert('打卡成功!');
      // }
  
    },
  }
})