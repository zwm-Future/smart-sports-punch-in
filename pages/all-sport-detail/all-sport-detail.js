import {
  getAllsportRecordDetail,
  getOneSportRecordDetail
} from '../../api/sports'
Page({
  data: {
    record: {
      sportTime: 0,
      punchTimes: 0,
      score: 0
    },
    sportList: []
  },
  onLoad: function (e) {
    const {
      title = '运动列表', sportId,sportName,stuId
    } = e;
    if (sportId) this.sportId = sportId;
    if (sportName) this.sportName = sportName;
    this.user = wx.getStorageSync('user');
    if(stuId) this.user.id = stuId;//老师端跳转传参带有学生id
    wx.setNavigationBarTitle({
      title
    })
  },
  onReady: function () {},
  _getList: async function (semesterId = 1) {
    try {
      let res;
      if (this.sportId) {
        res = await getOneSportRecordDetail({
          stuId: this.user.id,
          sportId: this.sportId,
          semesterId: semesterId
        });
      } else {
        res = await getAllsportRecordDetail({
          userId: this.user.id,
          semesterId: semesterId
        });
      }
      const {
        code,
        data
      } = res;
      let record = {
        sportTime: 0,
        punchTimes: 0,
        score: 0
      }
      const sportList = data.map(item => {
        item.sportTime = parseInt(item.sportTime / 60);
        if(this.sportName) item.sportName = this.sportName;
        record.sportTime += item.sportTime;
        record.punchTimes++;
        record.score += item.score;
        return item;
      })
      this.setData({
        sportList,
        record
      })
    } catch (error) {
      console.log(error);
    }
  },
  handleTagChange: function (e) {
    const {
      data
    } = e.detail;
    this._setRecord(data);
  },
  _setRecord: function (data) {
    let record = {
      sportTime: 0,
      punchTimes: 0,
      score: 0
    }
    data.forEach(item => {
      record.sportTime += item.sportTime;
      record.punchTimes++;
      record.score += item.score;
    })
    this.setData({
      record
    });
  },
  handleSemesterChange: function (e) {
    const semester = e.detail;
    this._getList(semester.id);
  }
})