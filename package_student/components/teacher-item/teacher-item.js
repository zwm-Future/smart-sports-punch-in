// components/teacher-item/teacher-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name:{
      type:String,
      value:"老师姓名"
    },
    number:{
      type:String,
      value:"xxxxxxxxx"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  pageLifetimes:{
    show() {
      console.log(111);
    }
  },
  lifetimes:{
    created() {
      console.log(222);
    }
  }
})
