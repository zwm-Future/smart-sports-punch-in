import {
  getsportRecordTotal,
  getAllsportRecord
} from '../../api/student/sports'
import {secondTransform} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordsLeft: [],
    recordsRight: [],
    allSport: {},
    stuId: '',
    bakcTop: 0 // 0 无  1 左底部 2 右底部
  },

  onLoad: function (options) {
    if (options.stuId) { //老师端跳转传参
      this.stuId = options.stuId;
      this.setData({
        stuId: this.stuId
      })
    } else this.stuId = wx.getStorageSync('user').id; //学生端
  },
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  turnSemester: function ({
    detail: semester
  }) {
    this._getTotal(semester.id);
    this._getSportItems(semester.id);
  },
  _getTotal: async function (semesterId) {
    try {
      const {
        stuId
      } = this;
      const {
        code,
        data
      } = await getsportRecordTotal({
        stuId,
        semesterId
      });
      if (code) {
        console.log(data);
        data.sportTime = data.sportTime ? secondTransform(data.sportTime) : {number:'0.0',unit:'min'};
        this.setData({
          allSport: data
        })
      }
    } catch (error) {
      console.log(error);
    }
  },
  _getSportItems: async function (semesterId) {
    try {
      const {
        stuId
      } = this;
      const {
        code,
        data
      } = await getAllsportRecord({
        stuId,
        semesterId
      });
      if (code) {
        let recordsLeft = [];
        let recordsRight = [];
        data.forEach((item, index) => {
          item.sportTime = item.sportTime > 0 ? secondTransform(item.sportTime) : {number:'0.0',unit:'min'};
          index % 2 == 0 ? recordsLeft.unshift(item) : recordsRight.unshift(item)
        })
        this.setData({
          recordsLeft,
          recordsRight
        }, () => {
          // 返回顶部按钮处理
          var query = wx.createSelectorQuery();
          query.select('.record-wrap').boundingClientRect(function ({
            height
          }) {
            const {
              windowHeight
            } = wx.getSystemInfoSync()
            if (height < windowHeight) return;
            const bakcTop = data.length % 2 ? 2 : 1;
            this.setData({
              bakcTop
            })
          }).exec();
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
})