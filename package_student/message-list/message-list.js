import {
  getMessage,
  setMesRead
} from '../api/message'
Page({
  data: {
    messageArr: []
  },
  onShow: function () {
    this._getMes()
  },
  handleTapMes:function(e) {
    console.log(e);
    const {index} = e.target.dataset;
    const {messageArr} = this.data;
    if(index > -1) {
      //消息未读 ->  已读
      if(!messageArr[index].read) this._setRead(messageArr[index].id);
      wx.navigateTo({
        url: `../message-view/message-view?content=${encodeURIComponent(messageArr[index].msgContent)}`,
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