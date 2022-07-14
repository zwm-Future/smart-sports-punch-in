import {
  getMyTeacher
} from '../../api/student/my-teacher'
const identityId = getApp().identityId;
console.log(identityId);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    teacherName: '',
    identityId:identityId,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let identityId;
   const user = wx.getStorageSync('user')
   if(user.identityId == 1) identityId = 1;
   else identityId = 2;
   this.setData({identityId});
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
  _setTeacher: async function () {
    try {
      let result = wx.getStorageSync('myTeacher');
      if (!result) result = await this._getTeaher();
      const {
        myTeacher,
      } = result;
      this.setData({
        teacherName: myTeacher.name,
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
      const result = {
        myTeacher: data,
        myCourse: other
      }
      code && wx.setStorageSync('myTeacher', result)
      return result;
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