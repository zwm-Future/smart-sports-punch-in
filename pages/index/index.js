const identityId = getApp().identityId;
Page({
  data: {
    identityId: identityId,
  },
  onLoad: function () {
    const user = wx.getStorageSync('user');
    if (user.identityId) {
      this.setData({
        identityId: user.identityId
      })
    }
  },
  onShow: function () {
    console.log('index,onShow');
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onPullDownRefresh: function (e) {
    try {
      let comp;
      if (this.selectComponent("#student-index")) comp = this.selectComponent("#student-index");
      else comp = this.selectComponent("#teacher-index");
      comp.onRefresh && comp.onRefresh();
    } catch (error) {
      console.log(error, '——index:Page');
    }
  },
})