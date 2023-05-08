// components/gps-strength/gps-strength.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //信号强度  0->弱 1->中等 2->强
    strength:{
      type:Number,
      value:2,
      observer:function(value) {
        let strengthClass = '';
        if(value == 0) strengthClass = 'week';
        else if(value == 1) strengthClass = 'middle';
        else strengthClass = 'high';
        this.setData({
          strengthClass
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    strengthClass:'high'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
