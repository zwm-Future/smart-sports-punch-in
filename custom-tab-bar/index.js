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
        pagePath: "/pages/punch/punch",
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
      if (!app.globalData.identifyConfirm) {
        let list;
        const user = wx.getStorageSync('user');
        console.log(user);
        if (user.identityId == 1) {
          list = [{
              pagePath: "/pages/index/index",
              text: "首页",
              iconPath: "/img/tarbar/home@3x.png",
              selectedIconPath: "/img/tarbar/home-selected@3x.png"
            },
            {
              pagePath: "/pages/punch/punch",
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
        } else {
          list = [{
              pagePath: "/pages/index/index",
              text: "首页",
              iconPath: "/img/tarbar/home@3x.png",
              selectedIconPath: "/img/tarbar/home-selected@3x.png"
            },
            {
              pagePath: "/package_teacher/publish/publish",
              bulge: true,
              iconPath: "/img/tarbar/publish@3x.png",
              selectedIconPath: "/img/tarbar/publish@3x.png"
            },
            {
              pagePath: "/pages/my/my",
              text: "我的",
              iconPath: "/img/tarbar/my@3x.png",
              selectedIconPath: "/img/tarbar/my-selected@3x.png"
            }
          ]
        }
        if (user.identityId && list) {
          this.setData({
            list
          }, () => {
            app.globalData.identifyConfirm = true
          });
        }
      }
    }
  }
})