Component({
  properties: {
    name:{
      type:String,
      value:"学生姓名"
    },
    number:{
      type:String,
      value:"xxxxxxxxx"
    }
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
