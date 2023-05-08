// components/show-modal/show-modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalVisible: {
      type: Boolean,
      value: false,
      observer: '_visibleChange',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: {
      visible: false,
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _visibleChange: function (newVal, oldVal, changedPath) {
      if (oldVal === false && newVal === true) {
        setTimeout(function () {
          this._onShow();
        }.bind(this), 0)
      }
    },
    _onShow: function () {
      this.setData({
        visible:true,
      })
    },
    _onCancel: function () {
      this.setData({
        visible: false,
      })
      setTimeout(function () {
        this.triggerEvent('modalCancel');
      }.bind(this), 200)
    }
  }
})