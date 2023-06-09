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
    // 0 停止中  1 继续中
    mode: 1,
    bottomSelector: false,
    selectorArr: [{
      text: '结束运动',
      className: 'end-class'
    }, {
      text: '继续运动',
      className: 'continue-class'
    }]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _turnMode: function () {
      let {
        mode
      } = this.data;
      this.setData({
        mode:!mode
      })
    },
    handlePause: function () {
      this._turnMode();
      this.triggerEvent('handlePause')
    },
    handleContinue: function () {
      this._turnMode();
      this.triggerEvent('handleContinue')
    },
    //长按2s 弹底部窗口
    handleEnd: function () {
      this.setData({
        bottomSelector: true
      })
    },
    handleCancleSelector: function () {
      this.setData({
        bottomSelector: false
      })
    },
    //结束
    handleSelector: function (e) {
      if (e.target.dataset.index == 0) {
        this.setData({
          mode:1
        })
        //处理结束
        this.triggerEvent('handleEnd');
      }
      this.handleCancleSelector();
    }
  }
})