import {
  getTeacherCourse,
  bindCourse
} from '../../../api/student/my-teacher.js'
const showTip = require('../../../public/showTip');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [{
        courseId: 1,
        name: '20级大学城校区周二34节篮球'
      },
      {
        courseId: 2,
        name: '20级大学城校区周二46节篮球'
      }
    ]
  },
  teacherID: '',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.teacherID = options.teacherID;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData();
  },
  initData: function () {
    this.getCourses();
  },
  getCourses: async function () {
    try {
      const res = await getTeacherCourse({semesterId:1});
      console.log(res);
    } catch (error) {

    }
  },
  bindMyCourse: async function (courseId) {
    try {
      const res = await bindCourse({courseId});
      console.log(res);
    } catch (error) {
      
    }
  },
  handleTap: function (e) {
    const {
      index
    } = e.target.dataset;
    wx.showModal({
      cancelText: '取消',
      confirmText: '确定',
      content: this.data.courses[index].name,
      showCancel: true,
      success: (result) => {
        if(result.confirm) {
          this.bindMyCourse(this.data.courses[index].courseId)
        }
      },
      fail: (res) => {},
    })
  },

})