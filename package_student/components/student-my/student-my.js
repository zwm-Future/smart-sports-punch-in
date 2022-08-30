import {
  getMyTeacher
} from "../../api/my-teacher"
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
    userInfo: {},
    teacherName: '',
    number: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _setTeacher: async function () {
      try {
        let result = wx.getStorageSync('myTeacher');
        if (!result) result = await this._getTeaher();
        const {
          myTeacher,
        } = result;
        this.setData({
          teacherName: myTeacher.name,
        })
      } catch (error) {
        console.log(error);
      }
    },
    _getTeaher: async function () {
      try {
        const {
          code,
          data,
          other
        } = await getMyTeacher({
          semesterId: '1'
        })
        const result = {
          myTeacher: data,
          myCourse: other
        }
        code && wx.setStorageSync('myTeacher', result)
        return result;
      } catch (error) {
        console.log(error);
        error.mes && Toast(error.mes, 'none');
      }
    },
  },
  lifetimes: {
    ready() {
      const userInfo = wx.getStorageSync('userInfo');
      const {
        number
      } = wx.getStorageSync('user');
      this.setData({
        userInfo,
        number
      });
      this._setTeacher();
    }
  },
})