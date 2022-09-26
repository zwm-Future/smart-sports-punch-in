import {
  getAllsportRecordDetail,
  getOneSportRecordDetail
} from '../../api/sports'
import {
  Toast
} from '../../public/showTip';
Page({
  data: {
    recordTotal: {
      sportTime: 0,
      punchTimes: 0,
      score: 0
    },
    sportList: [],
  },
  // cur:1, 当前页码
  // size:10, 一页几个
  //total:0 总共
  //preSportList:[]  保存已加载的分页
  onLoad: function (e) {
    //变量初始化
    this.cur = 1;
    this.size = 8;
    this.total = 8;
    this.type = 'all';
    this.preSportList = [];
    const {
      title = '运动列表', sportId, sportName, stuId
    } = e;
    if (sportId) this.sportId = sportId;
    if (sportName) this.sportName = sportName;
    this.user = wx.getStorageSync('user');
    if (stuId) this.user.id = stuId; //老师端跳转传参带有学生id
    wx.setNavigationBarTitle({
      title
    })
  },
  onReady: function () {},
  _getList: async function (semesterId = 1) {
    try {
      const {
        user,
        sportId,
        sportName,
        cur,
        size,
        type,
        data
      } = this;
      const {
        recordTotal
      } = data;
      let res;
      if (sportId) {
        res = await getOneSportRecordDetail({
          stuId: user.id,
          sportId: sportId,
          semesterId: semesterId,
          cur,
          size,
          type,
        });
      } else {
        res = await getAllsportRecordDetail({
          userId: user.id,
          semesterId: semesterId,
          cur,
          size,
          type,
        });
      }
      const {
        code,
        data: {
          data: list,
          sportTime,
          times,
          score
        }
      } = res;
      //格式成分钟
      const sportList = list.map(item => {
        item.sportTime = parseInt(item.sportTime / 60);
        if (sportName) item.sportName = sportName;
        return item;
      })
      recordTotal.sportTime = sportTime;
      recordTotal.punchTimes = times;
      recordTotal.score = score;
      this.total = times;
      this.preSportList = [...this.preSportList, ...sportList];
      this.setData({
        sportList: this.preSportList,
        recordTotal
      })
    } catch (error) {
      console.log(error);
    }
  },
  handleTagChange: function (e) {
    const {
      type
    } = e.detail;
    //标签换了 重新初始化分页
    this.type = type;
    this.cur = 1;
    this.size = 8;
    this.total = 8;
    this.preSportList = [];
    this._getList();
  },
  handleSemesterChange: function (e) {
    console.log(e);
    const semester = e.detail;
    this._getList(semester.id);
  },
  onReachBottom: function (e) {
    if (this.total <= this.cur * this.size) {
      Toast('已经到底啦！咔咔', 'none');
      return
    }
    //分页
    this.cur++;
    this._getList();
  }
})