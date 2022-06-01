import {
  getTodaysportRecord,
  getsportRecordTotal
} from '../../api/student/sports.js'
const app = getApp()

Page({
  data: {
    todaySportTime: 0,
    todayScore: 0,
    allMinutes:0,
    allScore:0
  },
  isOnFresh: false,
  onLoad() {},
  onReady: function () {
    this._initData();
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onPullDownRefresh: function (e) {
    this.onRefresh();
  },
  onRefresh: function () {
    if (this.isOnFresh) return;
    wx.showNavigationBarLoading({});
    this._initData();
    wx.stopPullDownRefresh({});
    wx.hideNavigationBarLoading({})
    this.isOnFresh = false;
  },
  _initData: function () {
    this._getTodayRecord();
    this._getTotalRecord();
  },
  _getTodayRecord: async function () {
    try {
      const user = wx.getStorageSync('user')
      const {
        code,
        data
      } = await getTodaysportRecord({
        userId: user.id
      });
      code && this.setData({
        todaySportTime: data.sportTime,
        todayScore: data.score
      })
      console.log(res);
    } catch (error) {

    }
  },
  _getTotalRecord: async function () {
    try {
      const user = wx.getStorageSync('user')
      const {
        code,
        data
      } = await getsportRecordTotal({
        semesterId: 1,
        stuId: user.id
      });
      if (code) {
        const allMinutes = data.sportTime == null ? 0 : parseInt(data.sportTime / 60);
        const allScore = data.score == null ? 0 : data.score;
        this.setData({
          allMinutes,
          allScore
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
})