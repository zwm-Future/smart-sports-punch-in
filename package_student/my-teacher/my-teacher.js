import {
  getMyTeacher
} from '../api/my-teacher'
import {
  getCurrentSemester
} from '../../api/semester'
import {
  Toast
} from '../../public/showTip'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherName: '',
    courseInfo: '',
    currentSemester: '2022-2023学年 第1学期'
  },
  onShow: function () {
    this._setTeacher();
    this._getCurrentSemester();
  },
  _setTeacher: async function () {
    try {
      let result = wx.getStorageSync('myTeacher');
      if (!result) result = await this._getTeaher();
      console.log(result);
      const {
        myTeacher = {
            name: ''
          },
          myCourse = {
            name: ''
          }
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
  },
  _getCurrentSemester: async function () {
    try {
      if (!app.globalData.currentSemester) {
        const {
          code,
          data: {
            name
          }
        } = await getCurrentSemester();
        if (code) {
          app.globalData.currentSemester = name;
        } else {
          console.log('code 0----my-teacher:Student——Page');
        }
      } else {
        const {
          currentSemester
        } = app.globalData;
        this.setData({
          currentSemester
        })
      }
    } catch (error) {
      console.log('my-teacher:package_student', error);
    }
  }
})