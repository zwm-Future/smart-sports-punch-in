Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tags: {
      type: Array,
      value: [{
          name: '全部',
        },
        {
          name: '一级',
        }, {
          name: '二级',
        },
      ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tagsData: []
  },
  lifetimes: {
    attached:function() {
      this._setClass();
    }
  },
  methods: {
    //设置选择
    _setSelect: function (index = 0) {
      try {
        const {
          tags
        } = this.properties;
        this._setClass(index);
        this.triggerEvent("selectChange", {
          value: tags[index],
          index
        })
      } catch (error) {
        console.log(error);
      }
    },
    //样式
    _setClass: function (index = 0) {
      try {
        const {
          tags
        } = this.properties;
        const tagsData = tags.map((item, i) => {
          item.className = i == index ? 'select' : '';
          return item;
        })
        this.setData({
          tagsData
        })
      } catch (error) {
        console.log(error);
      }
    },
    //点击
    bindChange: function (e) {
      const {
        select
      } = e.target.dataset;
      if (select > -1) this._setSelect(select)
    }
  }
})