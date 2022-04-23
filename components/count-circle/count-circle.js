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
    times: '00:00',
  },
  timer: null,
  count: 0,
  /**
   * 组件的方法列表
   */
  methods: {
    _start: function () {
      this.count = 0;
      this.setData({
        times:'00:00'
      })
      clearInterval(this.timer);
      this.timer = setInterval(this._timerFunc.bind(this), 1000)
    },
    _pause: function () {
      clearInterval(this.timer);
    },
    _continue: function () {
      clearInterval(this.timer);
      this.timer = setInterval(this._timerFunc.bind(this), 1000)
    },
    _getTimes: function () {
      return this.data.times;
    },
    _countToTimes: function (count) {
      let seconds = count % 60;
      let minutes = parseInt(count / 60);
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return minutes + ':' + seconds;
    },
    _timerFunc: function () {
      this.count++;
      const times = this._countToTimes(this.count);
      this.setData({
        times
      });
    }
  }
})