import {
  getAllSportType,
} from '../../../api/map.js'
const showTip = require('../../../public/showTip');
// 所有区域
let allArea = [];
const getData = [
  {
    name:'篮球场',
    point:[{
      "latitude": "23.038710610911647",
      "longitude": "113.39053300022123",
    },
    {
      "latitude": "23.038695801244263",
      "longitude": "113.39165952800748",
    },
    {
      "latitude": "23.037901013367755",
      "longitude": "113.39165416358945",
    },
    {
      "latitude": "23.037920759707493",
      "longitude": "113.39052227138517",
    },
  ]
  }
]
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
  allArea: [],
  lifetimes: {
    attached: function () {
      this._getAllArea();
    }
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
      this.triggerEvent('handleSetRange', points);
      this.setData({
        selectIndex
      })
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
    _getAllArea: async function () {
      try {
        // const res = await getAllSportType();
        // const {
        //   data
        // } = res;
        let typeArray = [],
          points = [];
        // this.allArea = data;
        this.allArea = getData;
        console.log(this.allArea);
        this.allArea.map((item, index) => {
          if (index == 0) {
            item.point.forEach(item => {
              points.push({
                latitude: item.latitude,
                longitude: item.longitude
              })
            })
          }
          typeArray[index] = item.name;
        })
        this.triggerEvent('handleSetRange', {points});
        this.setData({
          typeArray
        })
        console.log(typeArray);
      } catch (msg) {
        showTip.Alert(msg);
      }
    },
  }
})