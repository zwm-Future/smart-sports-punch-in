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
    bottomSelector:false,
    selectorArr:[{text:'结束运动',className:'end-class'},{text:'取消运动',className:'continue-class'}]
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
    },
    handleEnd:function () {
      this.setData({
        bottomSelector:true
      })
    },
    handleCancleSelector:function () {
        this.setData({
          bottomSelector:false
        })
    }
    ,
    handleSelector:function (e) {
      if(e.target.dataset.index !=0) return;
      this.handleCancleSelector();
      console.log('end');
    }
  }
})
