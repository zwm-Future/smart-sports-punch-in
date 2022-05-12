import {
  getMyTeacher
} from '../../api/student/my-teacher'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    teacherName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    this._setTeacher();
  },
  _setTeacher: function () {
    try {
      let myTeacher = wx.getStorageSync('myTeacher');
      if (!myTeacher) myTeacher = this._getTeaher();
      this.setData({
        teacherName: myTeacher.teacherName
      })
    } catch (error) {
      console.log(error);
    }
  },
  _getTeaher: async function () {
    try {
      const {
        code,
        data,
        other
      } = await getMyTeacher({
        semesterId: '1'
      })
      const teacherName = data.name ? data.name : '';
      const courseInfo = other && other.name ? other.name : '';
      code && wx.setStorageSync('myTeacher', {
        teacherName,
        courseInfo
      })
      return {
        teacherName,
        courseInfo
      };
    } catch (error) {
      console.log(error);
      error.mes && Toast(error.mes, 'none');
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
})