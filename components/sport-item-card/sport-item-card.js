import {colorClass} from "../../utils/mappingData"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sport: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemConfig:{
      color:''
    }
  },
  lifetimes: {
    attached: function () {
      const {
        sport
      } = this.data;
      const itemConfig = this._setClass(sport.sportName);
      this.setData({
        itemConfig
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //匹配当前类型
    _setClass: function (name) {
      let result = {};
      result.color = (colorClass[name] ? colorClass[name] : 'basketball-color');
      return result;
    }
  }
})