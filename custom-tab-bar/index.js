// custom-tar-bar/index.js
Component({
  data: {
    selected:null,
    color: "#9EA1A7",
    selectedColor: "#44CAAC",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/img/tarbar/home@3x.png",
        selectedIconPath: "/img/tarbar/home-selected@3x.png"
      },
      {
        pagePath: "/pages/punch/punch",
        bulge:true,
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
 
  /**
   * 组件的方法列表
   */
  onLoad() {
   console.log(111);
  },
  onShow: function () {
    console.log(222);
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    }
  }
})
