import {
  minTransform
} from "../../utils/util"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    record: {
      type: Object,
      value: {}
    }
  },
  observers: {
    "record": function (record) {
      console.log(record);
      record.sportTime = record.sportTime ? minTransform(record.sportTime) : [{
        number: 0.0,
        unit: 'min'
      }]
      this.setData({
        accmulateRecord: record
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    accmulateRecord: {
      sportTime: [],
      punchTimes: 0,
      score: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})