import {
  getTeacherCourse,
  getMyTeacher,
  bindCourse
} from '../../../api/student/my-teacher.js'
const showTip = require('../../../public/showTip');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: []
  },
  teacherId: '',
  onLoad: function (options) {
    this.teacherId = options.teacherId;
  },
  onShow: function (options) {
    this.initData();
  },
  initData: async function () {
    await this._getTeacherCourses();
    this._getMyCourse()
  },
  _getTeacherCourses: async function () {
    try {
      const {
        code,
        data
      } = await getTeacherCourse({
        semesterId: 1,
        teacherId: this.teacherId
      });
      code && this.setData({
        courseList: data
      })

    } catch (error) {
      console.log(error);
    }
  },
  _getMyCourse: async function () {
    try {
      let result = wx.getStorageSync('myTeacher');
      if (!result) result = _getTeaher();
      this.matchCourse(result.myCourse.id)
    } catch (error) {
      console.log(error);
    }
  },
  //包含我的课程
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
  //匹配找到我已绑定的课程
  matchCourse: function (myCourseId) {
    const {
      courseList
    } = this.data;
    const newCourseList = courseList.map(item => {
      item.selected = item.id == myCourseId;
      return item;
    });
    this.setData({
      courseList: newCourseList
    })
  },
  bindMyCourse: async function (slectCourse) {
    try {
      const {
        code,
        message
      } = await bindCourse({
        courseId: slectCourse.id
      });
      if (code) {
        const result = wx.getStorageSync('myTeacher');
        result.myCourse = slectCourse;
        wx.setStorageSync('myTeacher', result);
        showTip.Toast(message,'1');
        this.matchCourse(slectCourse.id)
      } else {
        showTip.Toast('绑定失败','error');
      }
    } catch (error) {

    }
  },
  handleTap: function (e) {
    const {
      index
    } = e.target.dataset;
    if (this.data.courseList[index].selected) {
      wx.showModal({
        confirmText: '确定',
        content: '已选择该课程,请勿重选',
      })
      return
    }
    wx.showModal({
      cancelText: '取消',
      confirmText: '确定',
      content: this.data.courseList[index].name,
      showCancel: true,
      success: (result) => {
        if (result.confirm) {
          this.bindMyCourse(this.data.courseList[index])
        }
      },
      fail: (res) => {},
    })
  },

})