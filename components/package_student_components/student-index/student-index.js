import {
  getTodaysportRecord,
  getsportRecordTotal,
  addSportRecord
} from '../../../api/sports.js'
import showTip from '../../../public/showTip.js';
const app = getApp();
Component({
  data: {
    todaySportTime: 0,
    todayScore: 0,
    allMinutes: 0,
    allScore: 0,
    modalStorage: false,
  },
  isOnFresh: false,
  /**
   * 组件的方法列表
   */
  methods: {
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
          todaySportTime: parseInt(data.sportTime / 60),
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
    },
    handleStorageSport: async function () {
      try {
        const [str, sceneId, start, end] = sportStorage;
        const {
          code,
        } = await addSportRecord({
          sceneId,
          sportTime: 1200,
          start,
          end,
          str
        })
        const modalStorage = true;
        if (code) {
          showTip.Toast('上传成功', 'none');
          modalStorage = false;
        } else {
          showTip.Toast('上传失败，请稍后重试!','none')
        }
        this.setData({
          modalStorage
        })
      } catch (error) {
        console.log(error, 'index:Page');
      }
    },
    checkStorageSport: function () {
      const sportStorage = wx.getStorageSync('str');
      if (!sportStorage) return;
      this.setData({
        modalStorage: true,
      })
    }
  },
  lifetimes: {
    attached: function () {
      if (wx.getStorageSync('user').identityId == 1) this._initData();
      this.checkStorageSport();
    }
  }
})