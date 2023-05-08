import {
  handleIdentityId
} from "../../utils/corn.js"
const identityId = getApp().identityId;
Page({
  data: {
    identityId: identityId,
  },
  onLoad() {
    handleIdentityId.call(this);
  },
  onShow() {
    //tarbar切换
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  }
})