import {
  getTeacherCourse,
} from '../../../api/teacher/course';
import {
  addCourseMes
} from '../../../api/teacher/message';
import {
  Toast
} from "../../../public/showTip";

Component({
  data: {
    modalVisible: false,
    courseList: [],
    selectAll: false
  },
  methods: {
    handleFinish(e) {
      this._getCourseList();
      this.setData({
        modalVisible: true
      })
      const {
        detail
      } = e;
      this.content = detail.html;
    },
    async _getCourseList() {
      try {
        const {
          code,
          data
        } = await getTeacherCourse({
          semesterId: 1
        });
        code && this.setData({
          courseList: data
        })

      } catch (error) {
        console.log(error);
      }
    },
    handleSelectAll(e) {
      let {
        selectAll
      } = this.data
      this.setData({
        selectAll: !selectAll
      })
    },
    handleCancle() {
      this.setData({
        modalVisible: false
      })
    },
    async handleSubmit(e) {
      try {
        const {
          detail: {
            value
          }
        } = e;
        if (value['checkbox-group'].length < 1) {
          Toast('至少选择一个！', 'none');
          return
        }
        const {
          code,
        } = await addCourseMes({
          content: this.content,
          courseId: value['checkbox-group']
        })
        if (!code) {
          Toast('发布失败', 'error');
        } else {
          const editorCtx = this.selectComponent('#myEditor');
          Toast('发布成功', 'success');
          editorCtx.clear();
        }
        this.setData({
          modalVisible: false
        })
      } catch (error) {
        console.log(error);
      }
    }
  },
  pageLifetimes: {
    show: function () {
      console.log('publish-show', );
    }
  }
})