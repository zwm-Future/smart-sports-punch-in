// pages/notice-text-view/notice-text-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:'',
    author:'',
    date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {title,content,author,date} = options;
    this.setData({
      title:decodeURIComponent(title),
      content:decodeURIComponent(content),
      author:decodeURIComponent(author),
      date:decodeURIComponent(date)
    })
  },
})