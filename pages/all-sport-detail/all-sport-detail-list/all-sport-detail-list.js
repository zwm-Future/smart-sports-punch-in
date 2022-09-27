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
    list: ['占用']
  },
  observers: {
    'sportList': function (value) {
      this.sportList = value;
      this.setData({
        list: value
      })
    }
  },
  methods: {
    handleSelectChange: function (e) {
      const {
        value,
        index
      } = e.detail;
      //（重复点击）
      if (this.selectIndex == index) return;
      //全部
      let type = 'all';
      //本月
      if (index == 1) {
        type = 'month';
      } else if (index == 2) { //本周
        type = 'week';
      } 
      this.triggerEvent('tagChange', {
        type
      });
      this.selectIndex = index;
    },
  },
  lifetimes:{
    attached:function() {
      this.selectIndex = 0;
    }
  }
})