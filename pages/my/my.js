import {
  handleIdentityId
} from "../../utils/corn.js"
const identityId = getApp().identityId;
Page({
  data: {
    identityId: identityId,
  },
  onLoad: function (options) {
    handleIdentityId.call(this);
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },
})