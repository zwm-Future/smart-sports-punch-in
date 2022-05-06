import {
  getMyTeacher
} from '../../api/student/my-teacher.js'
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData();
  },
  initData: async function () {
    try {
      const app =getApp();
      const res = await getMyTeacher({stuId:app.globalData.user.id})
      console.log(res);
    } catch (error) {
      error.mes && Toast(error.mes,'none');
    }
  }
})