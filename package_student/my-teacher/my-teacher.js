import {
  getMyTeacher
} from '../api/my-teacher'
import {
  _getCurrentSemester
} from "../../utils/currentSemester"
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
    currentSemesterName: '2022-2023学年 第1学期'
  },
  onShow: function () {
    this._initData();
  },
  _initData: async function () {
    await this._handleCurrentSemester();
    this._setTeacher();
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
        semesterId: this.currentSemesterId
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
  _handleCurrentSemester: async function () {
    const {
      name: currentSemesterName,
      id
    } = await _getCurrentSemester();
    this.currentSemesterId = id;
    this.setData({
      currentSemesterName
    })
  }
})