import {
  imgSrcArr
} from '../../utils/mappingData'
import {
  isEmpty
} from '../../utils/filter'
import {
  Toast
} from "../../public/showTip"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //input聚焦第几个
    focusIndex: 0,
    //顶部图片
    topImgSrc: ''
  },
  onReady: function () {
    this._setImgSrc()
  },
  _setImgSrc: function () {
    const num = Math.floor(Math.random() * imgSrcArr.length);
    this.setData({
      topImgSrc: imgSrcArr[num]
    })
  },
  tapForm: function ({
    target
  }) {
    let {
      dataset: {
        index
      }
    } = target;
    if (!index) index = 0;
    this.setData({
      focusIndex: index
    })
  },
  handleModify: async function (e) {
    const data = e.detail.value;
    if (!isEmpty(data)) {
      console.log(data);
    } else {
      Toast('请填写全部选项!','none');
    };
  }
})