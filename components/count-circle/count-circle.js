let count = 0;
let timer = null;
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
    times:'00:00',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _start:function () {
      count = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        count++;
        const times = this._countToTimes(count);
        this.setData({
          times
        })
      },1000)
    },
    _pause:function () {
      clearInterval(timer);
    },
    _continue:function () {
      clearInterval(timer);
      timer = setInterval(() => {
        count++;
        const times = this._countToTimes(count);
        this.setData({
          times
        })
      },1000)
    },
    _getTimes:function () {
      return this.data.times;
    }
    ,
    _countToTimes:function (count) {
      let seconds = count % 60;
      let minutes = parseInt(count / 60);
      seconds = seconds < 10 ?  '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return minutes + ':' + seconds;
    }
  }
})
