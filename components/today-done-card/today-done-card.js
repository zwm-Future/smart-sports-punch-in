import {
  getTodaysportRecord
} from '../../api/student/sports.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  data: {
    sportTime:0,
    score:0
  },
  pageLifetimes:{
    show:function() {
      this.getTodayRecord();
    }
  },
  methods: {
    getTodayRecord: async function () {
      try {
        const user = wx.getStorageSync('user')
        const {code,data} = await getTodaysportRecord({
          userId: user.id
        });
        code && this.setData({sportTime:data.sportTime,score:data.score})
        console.log(res);
      } catch (error) {

      }
    }
  }
})