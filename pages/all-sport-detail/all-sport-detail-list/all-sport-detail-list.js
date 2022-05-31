import {
  filterCurrentMonth,
  filterCurrenWeek
} from '../../../utils/timeFilterData'
Component({
  properties: {
    sportList: {
      type: Array,
      value: [],
    }
  },
  data: {
    tags: [{
        name: '全部',
      },
      {
        name: '本月',
      }, {
        name: '本周',
      },
    ],
    list: []
  },
  observers:{
    'sportList':function(value) {
      this.sportList = value;
      this.setData({
        list:value
      })
    }
  }
  ,
  methods: {
    handleSelectChange: function (e) {
      const {
        value,
        index
      } = e.detail;
      //节流
      if (this.selectIndex == index) return;
      const {
        sportList
      } = this;
      let newData = [];
      //本月
      if (index == 1) {
        newData = filterCurrentMonth(sportList);
      } else if (index == 2) { //本周
        newData = filterCurrenWeek(sportList);
      } else { //全部
        newData = sportList;
      }
      this.setData({
        list: newData
      });
      this.triggerEvent('tagChange',{data:newData});
      this.selectIndex = index;
    },
  }
})