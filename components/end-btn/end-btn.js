// components/end-btn/end-btn.js
let timer = null;
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
    className: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleLongpress:function () {
      const className = 'animation'
      timer = setTimeout(() => {
        this.triggerEvent('handleEnd');
      },1000)
      this.setData({
        className
      })
    },
    handleTouchEnd:function () {
      clearTimeout(timer);
      this.setData(
       {
         className: ''
       }
      )
    }
  }
})