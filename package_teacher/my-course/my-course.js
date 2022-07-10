import {
  getTeacherCourse,
} from '../../api/teacher/course.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onLoad:function() {
    this.teacher = wx.getStorageSync('user');

  },
  onShow() {
    this.initData()
  },
  turnSemester: function ({
    detail: semester
  }) {
    this._getTeacherCourses(semester.id)
  },
  initData: async function () {
    this._getTeacherCourses();
  },
  _getTeacherCourses: async function (semesterId) {
    try {
      let teacherId;
      if(this.teacher.id) teacherId = this.teacher.id;
      else throw('teacherId未知');
      const {
        code,
        data
      } = await getTeacherCourse({
        semesterId,
        teacherId
      });
      code && this.setData({
        courseList: data
      })

    } catch (error) {
      console.log(error);
    }
  },
})