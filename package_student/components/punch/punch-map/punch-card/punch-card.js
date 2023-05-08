import {
  getAllSportType,
  getCampus
} from '../../../../api/map.js';
import {
  getAllSports
} from '../../../../../api/sports'
const showTip = require('../../../../../public/showTip');
// 所有区域
let allArea = [];
const getData = [{
    name: '篮球场',
    point: [{
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
  },
  {
    name: '篮球场_A',
    point: [{
        "latitude": "23.039431346094673",
        "longitude": "113.39045253395078",
      },
      {
        "latitude": "23.03959918798158",
        "longitude": "113.39174535869596",
      },
      {
        "latitude": "23.037841774331422",
        "longitude": "113.39171317218778",
      },
      {
        "latitude": "23.037866457266134",
        "longitude": "113.39048472045896",
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
    campusName: [],
    //校区选择器选择值
    selectCampusIndex: 0,
    //区域选择器数组
    areaArray: [],
    //区域选择器选择值
    selectAreaIndex: 0,
  },
  allCampus: [],
  allArea: [],
  lifetimes: {
    attached: function () {
      this.initData();
    },
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
    bindPickerChange: function (e, index) {
      const {
        allArea
      } = this;
      const selectAreaIndex = index != undefined ? index : e.detail.value;
      let points = [];
      allArea[selectAreaIndex].point.forEach((item) => {
        points.push({
          latitude: item.latitude,
          longitude: item.longitude
        });
      })
      this.triggerEvent('handleSetRange', {
        points
      });
      this.setData({
        selectAreaIndex
      })
    },
    //开始打卡
    bindBegin: function () {
      const {
        selectAreaIndex
      } = this.data;
      //触发父 function
      this.triggerEvent('handlePunch', {
        scene: this.allArea[selectAreaIndex]
      });
    },
    //初始化
    initData: function () {
      this._getAllCampus()
      this._getAllArea()
    },
    //获取场地
    _getAllArea: async function () {
      try {
        const {
          code: codeArea,
          data: areaData
        } = await getAllSportType();
        const {
          code: codeSport,
          data: sportData
        } = await getAllSports();
        if (!codeArea || !codeSport) return;
        const allAreaArray = areaData.map(item => {
          const tItem = sportData.find(cItem => cItem.id == item.sportId)
          item.minTime = tItem.minTime;
          return item;
        });
        const areaArray = allAreaArray.map(item => item.name);
        this.allArea = allAreaArray;
        console.log(allAreaArray,areaArray);
        this.bindPickerChange(0, 0);
        this.setData({
          areaArray
        })
      } catch (msg) {
        console.log(msg);
      }
    },
    //获取校区
    _getAllCampus: async function () {
      try {
        const {
          code,
          data
        } = await getCampus();
        if (code) {
          this.allCampus = data;
          const campusName = data.map(item => item.name);
          this.setData({
            campusName
          });
        }
      } catch (error) {

      }
    },
  }
})