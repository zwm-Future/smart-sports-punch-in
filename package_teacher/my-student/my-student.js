import {
  getMyStudents
} from '../api/student'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentList: []
  },
  oldList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {courseId,name = '运动'} = options;
    this.courseId = courseId;
    this.setData({
      search: this.search.bind(this)
    })
    wx.setNavigationBarTitle({
      title:name
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData();
  },
  initData: function () {
    this.getMyStudentList();
  },
  getMyStudentList: async function () {
    try {
      let courseId;
      if(this.courseId) courseId = this.courseId;
      else throw('courseId未知——my-student:package_teacher');
      const {
        code,
        data
      } = await getMyStudents({
        courseId
      });
      if (code) {
        this.oldList = data;
        this.setData({
          studentList: data
        });
      }
    } catch (error) {

    }
  },
  search: function (value) {
    const valeueArr = value.split('');
    let newList = [];
    if (value == '') newList = this.oldList;
    else newList = this.data.studentList.filter(item => {
      return valeueArr.some(cItem => item.name.includes(cItem))
    })
    this.setData({
      studentList: newList
    })
    //官方自定义组件返回值 require
    return new Promise((resolve, reject) => {})
  },
})