import {
  getTeacherCourse,
  addTeacherCourse
} from '../../api/teacher/course.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    addModal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  onLoad:function() {
    this.teacher = wx.getStorageSync('user');

  },
  onShow() {
    this.initData()
  },
  turnSemester: function ({
    detail: semester
  }) {
    this._getTeacherCourses(semester.id)
  },
  initData: async function () {
    this._getTeacherCourses();
  },
  _getTeacherCourses: async function (semesterId) {
    try {
      let teacherId;
      if(this.teacher.id) teacherId = this.teacher.id;
      else throw('teacherId未知');
      const {
        code,
        data
      } = await getTeacherCourse({
        semesterId,
        teacherId
      });
      code && this.setData({
        courseList: data
      })

    } catch (error) {
      console.log(error);
    }
  },
  handleLongPress:function(e) {
    console.log(e);
  },
  showAddModal:function(e) {
    this.setData({
      addModal:true
    })
  },
  addTurnSemester:function({detail:semester}) {
    this.addSemester = semester;
  },
  handleCancle:function() {
    this.setData({
      addModal:false
    })
  },
  handleAdd:async function(e) {
   try {
    const {name}  = e.detail.value;
    if(this.addSemester.id && name) {
      const {code} = await addTeacherCourse({semesterId:this.addSemester.id,name});
      if(code) {
        this.handleCancle();
      }else {
        console.log('error');
      }
    }
   } catch (error) {
     console.log(error);
   }

  }
})