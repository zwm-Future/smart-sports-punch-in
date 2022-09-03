import {
  imgSrcArr
} from '../../utils/mappingData'
import {
  isEmpty
} from '../../utils/filter'
import {
  Toast
} from "../../public/showTip"
import {
  modifyPsw
} from '../../api/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //input聚焦第几个
    focusIndex: 0,
    //顶部图片
    topImgSrc: '',
    oldPsw: '',
    newPsw: '',
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
      if (data.newPsw.length < 8) return Toast('新密码至少8位！', 'none');
      const {
        code
      } = await modifyPsw(data);
      if (code) {
        (function modifyCorrect() {
          Toast('修改成功', 'success');
          this.setData({
            oldPsw: '',
            newPsw: '',
          })
        })();
      } else {
        Toast('旧密码不正确！', 'error');
      }
    } else {
      Toast('请填写全部选项!', 'none');
    };
  },
})