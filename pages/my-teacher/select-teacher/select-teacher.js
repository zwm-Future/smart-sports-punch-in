import {
  getAllTeachers
} from '../../../api/student/my-teacher.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherList: []
  },
  oldList: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.login({
      timeout: 1000,
      success: (res) => {
        console.log(res);
        // wx.request({
        //   url: `https://www.bingcoke.com/sport/user/reAndLogin?name=${'猪小明'}&number=3120004860&identityId=1&password=123456&code=${res.code}`,
        //   method:'POST',
        //   success:(r) => {
        //     console.log(r);
        //   }
        // })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData();
  },
  initData: function () {
    this.getAllTeacherList();
  },
  getAllTeacherList: async function () {
    try {
      const {
        code,
        data
      } = await getAllTeachers();
      if (code) {
        this.oldList = data;
        this.setData({
          teacherList: data
        });
      }
    } catch (error) {

    }
  },
  search: function (value) {
    const valeueArr = value.split('');
    let newList = [];
    if (value == '') newList = this.oldList;
    else newList = this.data.teacherList.filter(item => {
      return valeueArr.some(cItem => item.name.includes(cItem))
    })
    this.setData({
      teacherList: newList
    })
    //官方自定义组件返回值 require
    return new Promise((resolve, reject) => {})
  },
})