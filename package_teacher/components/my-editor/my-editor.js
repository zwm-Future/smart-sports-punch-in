import {
  Toast
} from "../../../public/showTip"
Component({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 86,
    keyboardHeight: 0,
    toolbarTop: 0,
    isIOS: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    readOnlyChange() {
      this.setData({
        readOnly: !this.data.readOnly
      })
    },
    updatePosition(keyboardHeight) {
      const toolbarHeight = 50
      const {
        windowHeight,
        platform
      } = wx.getSystemInfoSync();
      console.log(wx.getSystemInfoSync());
      let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) / windowHeight * 100 : 100 - 14;
      const toolbarTop = windowHeight - keyboardHeight;
      this.setData({
        editorHeight,
        keyboardHeight,
        toolbarTop
      })
    },
    calNavigationBarAndStatusBar() {
      const systemInfo = wx.getSystemInfoSync()
      const {
        statusBarHeight,
        platform
      } = systemInfo
      const isIOS = platform === 'ios'
      const navigationBarHeight = isIOS ? 44 : 48
      return statusBarHeight + navigationBarHeight
    },
    onEditorReady() {
      const that = this

      this.createSelectorQuery().select('#editor').context(function (res) {
        that.editorCtx = res.context
      }).exec()
    },
    blur() {
      this.editorCtx.blur()
    },
    format(e) {
      let {
        name,
        value
      } = e.target.dataset
      if (!name) return
      // console.log('format', name, value)
      this.editorCtx.format(name, value)

    },
    onStatusChange(e) {
      const formats = e.detail
      this.setData({
        formats
      })
    },
    insertDivider() {
      this.editorCtx.insertDivider({
        success: function () {
          console.log('insert divider success')
        }
      })
    },
    clear() {
      this.editorCtx.clear({
        success: function (res) {
          console.log("clear success")
        }
      })
    },
    removeFormat() {
      this.editorCtx.removeFormat()
    },
    insertDate() {
      const date = new Date()
      const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      this.editorCtx.insertText({
        text: formatDate
      })
    },
    // insertImage() {
    //   const that = this
    //   wx.chooseMedia({
    //     count: 1,
    //     success: function (res) {
    //       that.editorCtx.insertImage({
    //         src: res.tempFiles[0].tempFilePath,
    //         data: {
    //           id: 'abcd',
    //           role: 'god'
    //         },
    //         width: '80%',
    //         success: function () {
    //           console.log('insert image success')
    //         }
    //       })
    //     }
    //   })
    // },
    handleFinish: async function () {
      try {
        const {
          text,
          html
        } = await this.editorCtx.getContents();
        const res = await this.editorCtx.getContents();
        console.log(res);
        if (text.search(/^[\n]*$/) == 0) {
          Toast('当前内容为空', 'none');
          return;
        }
        this.triggerEvent('Finish', {
          html
        });
      } catch (error) {
        Toast
      }
    }
  },
  lifetimes: {
    attached() {
      const platform = wx.getSystemInfoSync().platform
      const isIOS = platform === 'ios'
      this.setData({
        isIOS
      })
      const that = this
      this.updatePosition(0)
      let keyboardHeight = 0
      wx.onKeyboardHeightChange(res => {
        if (res.height === keyboardHeight) return
        console.log(res);
        const duration = res.height > 0 ? res.duration * 1000 : 0
        keyboardHeight = res.height
        setTimeout(() => {
          wx.pageScrollTo({
            scrollTop: 0,
            success() {
              that.updatePosition(keyboardHeight)
              that.editorCtx.scrollIntoView()
            }
          })
        }, duration)
      })
    }
  }
})