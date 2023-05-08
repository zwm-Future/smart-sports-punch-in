import {imgSrc,colorClass,imgClass} from '../../utils/mappingData' 

Component({
  /**
   * 组件的属性列表
   */
  properties: {

    name: {
      type: String,
      value: '未知'
    },
    date: {
      type: String,
      value: ''
    },
    sportTime:{
      type:Array,
      value:[]
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    cardItemConfig: {
      color: '',
      img: '',
      imgClass:''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //匹配当前类型
    _setClass: function (name) {
      let result = {};
      result.color = 'record-card ' + (colorClass[name] ? colorClass[name] : 'basketball-color');
      result.imgClass = 'img-wrap ' + (imgClass[name] ? imgClass[name] : 'basketball-img');
      result.img = imgSrc[name] ? imgSrc[name] :  '/img/record/baseketball@3x.png';
      return result;
    }
  },
  lifetimes: {
    ready: function () {
      const {
        name
      } = this.data;
      const cardItemConfig = this._setClass(name);
      this.setData({
        cardItemConfig
      })
    }
  }
})