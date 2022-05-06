// components/auth-dialog/auth-dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    logoutModalVisible:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handdleTap: function (e) {
      const {
        type
      } = e.target.dataset;
      if (type == 'logout') {
        console.log('logout');
        this.setData({
          logoutModalVisible:true
        })
      } else {
        console.log(11);
        wx.getSetting({
          success(res) {
            console.log(res);
            if (!res.authSetting['scope.userInfo']) {
              wx.authorize({
                scope: 'scope.userInfo',
                success(res) {
                  console.log(res);
                }
              })
            }
          }
        })
      }
    },
    handleCancleModal: function () {
      this.setData({
        logoutModalVisible: false
      })
    },
  },
})