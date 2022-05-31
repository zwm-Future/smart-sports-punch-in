import {
  getMessage,
  setMesRead
} from '../../api/student/message'
Page({
  data: {
    messageArr: []
  },
  onShow: function () {
    this._getMes()
  },
  handleTapMes:function(e) {
    const {index} = e.target.dataset;
    const {messageArr} = this.data;
    if(index > -1) {
      //消息未读 ->  已读
      if(!messageArr[index].read) this._setRead(messageArr[index].id);
      wx.navigateTo({
        url: `/pages/message-view/message-view?content=${messageArr[index].msgContent}`,
      })
    }
  },
  _getMes: async function () {
    try {
      const {
        code,
        data
      } = await getMessage();
      if (code) {
        this.setData({
          messageArr:data
        })
      }
    } catch (error) {
      console.log(error);
    }

  },
  _setRead:async function(id) {
    const res = await setMesRead([id])
    console.log(res);
  }
})