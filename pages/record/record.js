import {
  getsportRecordTotal,
  getAllsportRecord
} from '../../api/student/sports'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordsLeft: [],
    recordsRight: [],
    allSport: {},
    stuId:'',
  },

  onLoad: function (options) {
    if(options.stuId) {//老师端跳转传参
      this.stuId = options.stuId;
      this.setData({
        stuId:this.stuId
      })
    }
    else this.stuId = wx.getStorageSync('user').id;//学生端
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
        data.sportTime = data.sportTime ? parseInt(data.sportTime / 60) : 0;
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
          index % 2 == 0 ? recordsLeft.unshift(item) : recordsRight.unshift(item)
        })
        this.setData({
          recordsLeft,
          recordsRight
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
})