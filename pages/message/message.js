import {
  getMessage
} from '../../api/student/message'
Page({
  data: {
    courseMes: {
      unReadSize: 0,
      date: ''
    }
  },
  onShow: function () {
    this._getMes()
  },
  _getMes: async function () {
    try {
      const {
        code,
        data,
        other: {
          unReadSize
        }
      } = await getMessage();
      if (code) {
        let earlistIndex = 0;
        //处获取最新消息时间
        let t = new Date(data[0].createStamp);
        data.forEach((item, index) => {
          const date = new Date(item.createStamp)
          if (data > t) {
            t = data, earlistIndex = index
          }
        })
        this.setData({
          courseMes: {
            unReadSize,
            date: data[earlistIndex].createStamp
          }
        })
      }
    } catch (error) {
      console.log(error);
    }

  }
})