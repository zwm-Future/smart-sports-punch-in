import {
  getAllSemesters
} from '../../api/semester'
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
      await this.getSemesters();
      this.semesterChange({
        detail: {
          value: 0
        }
      });
    },
    getSemesters: async function () {
      try {
        const {
          code,
          data
        } = await getAllSemesters();
        if (code) {
          this.setData({
            semesterRange: data
          })
        }
      } catch (error) {
        console.log(error);
      }

    },
  }
})