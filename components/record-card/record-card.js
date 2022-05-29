// components/record-card/record-card.js
//name --> color
const colorClass = {
  '篮球':'basketball-color',
  '足球':'football-color',
  '网球':'tennis-color',
  '排球':'volley-color',
  '羽毛球':'badminton-color'
}
//name --> imgClass
const imgClass = {
  '篮球':'basketball-img',
  '足球':'football-img',
  '网球':'tennis-img',
  '排球':'volley-img',
  '羽毛球':'badminton-img'
}
//匹配图片路径
const imgSrc = {
  '篮球':'/img/record/baseketball@3x.png',
  '足球':'/img/record/volley@3x.png',
  '网球':'/img/record/tennis@3x.png',
  '排球':'/img/record/volley@3x.png',
  '羽毛球':'/img/record/badminton@3x.png'
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '未知'
    },
    number: {
      type: Number,
      value: 0
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    item:{
      color:'',
      img:''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //匹配当前类型
    setClass:function(name) {
      let result = {};
      if(colorClass[name]) console.log(222);
      else console.log(111);
      result.color = 'record-card '  + (colorClass[name] ?  colorClass[name] : 'basketball-color');
      result.imgClass = 'img-wrap '  + (imgClass[name] ? imgClass[name] : 'basketball-img');
      result.img = imgSrc[name] ? imgSrc[name] : '/img/record/baseketball@3x.png'
      return result;
    }
  },
  lifetimes: {
    ready: function () {
      const {name} = this.data;
      const item = this.setClass(name);
      this.setData({
        item
      })
    }
  }
})