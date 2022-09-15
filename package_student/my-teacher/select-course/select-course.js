import {
  getTeacherCourse,
  getMyTeacher,
  bindCourse
} from '../../api/my-teacher'
const showTip = require('../../../public/showTip');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: []
  },
  teacher: {},
  onLoad: function (options) {
    this.teacherId = options.teacherId;
    this.teacherName = options.name;
  },
  onShow: function (options) {
    this.initData();
  },
  initData: async function () {
    console.log(11);
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
        message = '绑定失败'
      } = await bindCourse({
        courseId: slectCourse.id
      });
      if (code) {
        const result = wx.getStorageSync('myTeacher');
        let myTeacher = {id:this.teacherId,name:this.teacherName}
        result.myCourse = slectCourse;
        result.myTeacher = myTeacher;
        wx.setStorageSync('myTeacher', result);
        showTip.Toast(message,'1');
        this.matchCourse(slectCourse.id)
      } else {
        message ? showTip.Toast(message,'error') : showTip.Toast('绑定失败','error');
      }
    } catch (error) {
      console.log(error, '---select-course:Component');
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
      fail: (res) => {console.log(res);},
    })
  },

})