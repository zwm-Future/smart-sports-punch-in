// package_teacher/components/teacher-my/teacher-my.js
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
    userInfo: {},
    teacherName: '',
    number:'',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    ready() {
      const userInfo = wx.getStorageSync('userInfo');
      const {number} = wx.getStorageSync('user'); 
      this.setData({
        userInfo,
        number
      });
    }
  }
})
