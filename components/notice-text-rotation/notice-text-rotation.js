import {getTextNoticeList,handleTapText} from '../../utils/notice'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    textList:[]
  },
  lifetimes:{
    attached:function() {
      getTextNoticeList.call(this);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapText:function(e) {
      handleTapText.call(this,e);
    }
  }
})
