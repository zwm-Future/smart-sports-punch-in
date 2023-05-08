import {
  getTeacherCourse,
  addTeacherCourse,
  deleteTeacherCourse
} from '../api/course'

import {
  Toast
} from "../../public/showTip"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [],
    addModal: false,
    deleteModal: false,
    deleteCourse: {}
  },
  onLoad: function () {
    this.teacher = wx.getStorageSync('user');
  },
  turnSemester: function ({
    detail: semester
  }) {
    this.semester = semester;
    this._getTeacherCourses(semester.id)
  },
  _getTeacherCourses: async function (semesterId,loading) {
    try {
      let teacherId;
      if (this.teacher.id) teacherId = this.teacher.id;
      else throw ('teacherId未知');
      const {
        code,
        data
      } = await getTeacherCourse({
        semesterId,
        teacherId
      },
      loading);
      code && this.setData({
        courseList: data
      })

    } catch (error) {
      console.log(error);
    }
  },
  handleLongPress: function ({
    target: {
      dataset: {
        courseIndex,
        id
      }
    }
  }) {
    this.setData({
      deleteModal: true,
      addModal: false,
      deleteCourse: this.data.courseList[courseIndex].name
    })
    this.deleteCourseId = id;
  },
  showAddModal: function (e) {
    this.setData({
      addModal: true,
      deleteModal: false,
    })
  },
  addTurnSemester: function ({
    detail: semester
  }) {
    this.addSemester = semester;
  },
  handleCancle: function () {
    this.setData({
      addModal: false,
      deleteModal: false
    })
  },
  handleAdd: async function (e) {
    try {
      const {
        name
      } = e.detail.value;
      if (this.addSemester.id && name) {
        const {
          code
        } = await addTeacherCourse({
          semesterId: this.addSemester.id,
          name
        });
        if (code) {
          Toast('新增成功', 'success');
          this.handleCancle();
        } else {
          Toast('新增失败', 'error');
          console.log('error');
        }
        this._getTeacherCourses(this.semester.id,false)
      }else {
        Toast('请输入课程名称','error')
      }
    } catch (error) {
      this._getTeacherCourses(this.semester.id,false)
      console.log(error, 'my-course:Page');
    }
  },
  deleteCourse: async function () {
    try {
      const {
        code,
        message
      } = await deleteTeacherCourse([this.deleteCourseId]);
      if (code) {
        Toast(message, 'success');
      } else {
        Toast('刪除失败!', 'error');
      }
      this.handleCancle();
      this._getTeacherCourses(this.semester.id,false)
    } catch (error) {
      this._getTeacherCourses(this.semester.id,false)
      console.log(error, 'my-course:Page');
    }
  }
})