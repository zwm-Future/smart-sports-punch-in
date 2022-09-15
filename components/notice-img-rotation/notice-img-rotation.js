import {getImgNotice} from '../../api/notice'
const app = getApp();
const baseURL = app.globalData.baseUrl;
Component({
  data: {
    imgList:[]
  },
  lifetimes:{
    attached:function() {
      this._getImgNoticeList()
    }
  },
  methods: {
    _getImgNoticeList:async function() {
      try {
        const {code,data} = await getImgNotice();
        if(code) {
          const imgList = data.map(i => baseURL + '/ann/imag?imagId=' + i.id)
          this.setData({
            imgList
          })
        }else {
          console.log('code 0--notice-img-rotation:Component');
        }
      } catch (error) {
        console.log(error,'notice-img-rotation:Component');
      }
    },
    handleTapImg:function({target:{dataset:{imgIndex}}}) {
      const {imgList} = this.data;
      wx.previewImage({
        urls: imgList,
        current:imgList[imgIndex],
        showmenu:true,
        fail:e => {
          console.log(e,'notice-img-rotation');
        }
      })
    },
    
  }
})
