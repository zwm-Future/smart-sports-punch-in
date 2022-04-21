// pages/punch/operation-tab/operation-tab.js
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
    // 0 继续  1 停止
    mode:0,
    pickerArr:['结束运动','继续运动']
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _turnMode:function () {
        let {mode} = this.data;
        mode = mode ? 0 : 1;
        this.setData({
          mode
        })
    },
    handlePause:function () {
      this._turnMode();
      this.triggerEvent('handlePause')
    },
    handleContinue:function () {
      this._turnMode();
      this.triggerEvent('handleContinue')
    }
  }
})
