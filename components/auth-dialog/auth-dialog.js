import setLoginStatus from "../../api/setLoginStatus";
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
  },
  data: {
    logoutModalVisible: false,
    disable: false
  },
  methods: {
    handdleTap: async function (e) {
      try {
        this.setData({
          disable: true
        });
        const {
          type
        } = e.target.dataset;
        //退出小程序
        if (type == 'logout') {
          console.log('logout');
          this.setData({
            logoutModalVisible: true
          })
        } else { //登录授权
          const {
            userInfo
          } = await wx.getUserProfile({
            desc: '展示用户信息',
          })
          //成功授权
          userInfo && wx.setStorageSync('userInfo', userInfo);
          //登录验证
          this.handleLogin();
        }
      } catch (error) {
        //用户信息授权失败
        this.triggerEvent('handleAuthFail', '授权失败');
      }
      this.setData({
        disable: false
      });
    },
    //登录验证
    handleCancleModal: function () {
      this.setData({
        logoutModalVisible: false
      })
    },
    handleLogin: async function () {
      try {
        const {
          isExist,
          error
        } = await setLoginStatus();
        if (error) return;
        if (isExist) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else {
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      } catch (error) {
        console.log('auth-dialog:Component', error);
      }
    }
  },
})