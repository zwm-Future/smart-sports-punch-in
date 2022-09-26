import {
  _getAllSemester
} from "../../utils/currentSemester"
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
    semesterRange: [],
    rangeIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function () {
      this.initData()
    }
  },
  methods: {
    semesterChange: function (e) {
      const {
        semesterRange
      } = this.data;
      this.setData({
        rangeIndex: e.detail.value
      })
      this.triggerEvent("semesterPickChange", semesterRange[e.detail.value])
    },
    initData: async function () {
      await this._setSemesters();
      this.semesterChange({
        detail: {
          value: 0
        }
      });
    },
    _setSemesters: async function () {
      try {
        const semesterRange = await _getAllSemester();
        this.setData({
          semesterRange
        })
      } catch (error) {
        console.log(error, 'semester-picker:Component');
      }

    },
  }
})