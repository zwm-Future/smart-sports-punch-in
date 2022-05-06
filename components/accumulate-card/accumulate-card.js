import {
  getsportRecordTotal
} from "../../api/student/sports"
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
    minutes: 0,
    score: 0
  },
  lifetimes: {
    ready: function () {
      this.getTotalRecord()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getTotalRecord: async function () {
      try {
        const app = getApp();
        const {
          user
        } = app.globalData;
        const res = await getsportRecordTotal({
          semesterId: 1,
          stuId: user.id
        });
        const {
          code,
          data
        } = res;
        if (code) {
          const minutes = data.sportTime == null ? 0 : parseInt(data.sportTime / 60);
          const score = data.score == null ? 0 : data.score;
          this.setData({
            minutes,
            score
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
})