// components/waveBg.js
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
    show:false,
    count: 3,
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _handleCount: function (callBack) {
      this.setData({
        show:true,
        count:3
      })
      this.timer = setInterval(() => {
        let {
          count
        } = this.data;
        if (count == 'Go!') {
          clearInterval(this.timer);
          this.timer = null;
          this.setData({
            show:false
          })
          callBack && callBack();
          return
        }
        count = count == 1 ? 'Go!' : count - 1;
        this.setData({
          count
        })
      }, 1000);
    },
  },
  lifetimes: {
    ready: function () {

    }
  }
})