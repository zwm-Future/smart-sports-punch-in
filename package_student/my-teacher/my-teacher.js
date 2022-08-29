import {
  getMyTeacher
} from '../api/my-teacher'
import {
  Toast
} from '../../public/showTip'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherName: '',
    courseInfo: '',
  },
  onShow: function () {
    this._setTeacher();
  },
  _setTeacher: async function () {
    try {
      let result = wx.getStorageSync('myTeacher');
      if (!result) result = await this._getTeaher();
      console.log(result);
      const {
        myTeacher = {name:''},
        myCourse = {name:''}
      } = result;
      this.setData({
        teacherName: myTeacher.name || '',
        courseInfo: myCourse.name || ''
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
  }
})