const app = getApp();
Component({
  data: {
    //是否隐藏
    hide: false,
    // 当前选中 index
    selected: null,
    color: "#9EA1A7",
    selectedColor: "#44CAAC",
    backgroundColor: "#ffffff",
    list: [{
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/img/tarbar/home@3x.png",
        selectedIconPath: "/img/tarbar/home-selected@3x.png"
      },
      {
        pagePath: "/pages/main-func/main-func",
        bulge: true,
        iconPath: "/img/tarbar/clock@3x.png",
        selectedIconPath: "/img/tarbar/clock@3x.png"
      },
      {
        pagePath: "/pages/my/my",
        text: "我的",
        iconPath: "/img/tarbar/my@3x.png",
        selectedIconPath: "/img/tarbar/my-selected@3x.png"
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
    }
  },
  lifetimes: {
    ready: function () {
      if (app.globalData.identifyConfirm < 3) {
        let {
          list
        } = this.data;
        const user = wx.getStorageSync('user');
        if (user.identityId == 2) {
          list[1].iconPath = '/img/tarbar/publish@3x.png';
          list[1].selectedIconPath = '/img/tarbar/publish@3x.png';
        }
        if (user.identityId && list.length > 0) {
          this.setData({
            list
          }, () => {
            app.globalData.identifyConfirm++;
          });
        }
      }
    }
  }
})