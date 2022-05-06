// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records:[
      {
        name:'篮球',
        number:50
      },
      {
        name:'足球',
        number:60
      },
      {
        name:'网球',
        number:50
      },
      {
        name:'羽毛球',
        number:50
      },
      {
        name:'排球',
        number:50
      },
    ],
    recordsLeft:[
      {
        name:'网球',
        number:50
      },
      {
        name:'羽毛球',
        number:50
      },
    ],
    recordsRight:[
      {
        name:'篮球',
        number:50
      },
      {
        name:'足球',
        number:60
      },
      {
        name:'排球',
        number:50
      },
    ],
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

  },

  turnSemester:function() {
    console.log(123);
  }
})