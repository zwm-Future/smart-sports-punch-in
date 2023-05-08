// components/my-animation/my-animation.js
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
    number: 1,
    preNumber: 1,
    slideInAnimaiton: '',
    slideOutAnimaiton: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    count: function () {
      const {
        number,
      } = this.data;
      this.setData({
        preNumber: number,
        number: number + 1,
        slideInAnimaiton: 'slide-in',
        slideOutAnimaiton: 'slide-out'
      })
      if(this.timer) return; 
      this.timer = setTimeout(() => {
        this.setData({
          preNumber: this.data.number,
          slideInAnimaiton: '',
          slideOutAnimaiton: ''
        })
        clearTimeout(this.timer);
        this.timer = null;
      }, 700)
    }
  }
})