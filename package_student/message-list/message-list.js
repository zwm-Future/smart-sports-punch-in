import {
  getMessage,
  setMesRead
} from '../api/message'
Page({
  data: {
    messageArr: []
  },
  onReady: function () {
    this._getMes()
  },
  handleTapMes: function ({
    currentTarget: {
      dataset: {
        index
      }
    }
  }) {
    const {
      messageArr
    } = this.data;
    if (index > -1) {
      //消息未读 ->  已读
      if (!messageArr[index].read) this._setRead(messageArr[index].id);
      console.log(this.realData);
      wx.navigateTo({
        url: `../message-view/message-view?content=${encodeURIComponent(this.realMsgContent[index])}`,
      })
    }
  },
  _getMes: async function () {
    try {
      let {
        code,
        data
      } = await getMessage();
      if (code) {
        this.realData = Object.assign(data);
        let realMsgContent = []
        let result = data.map(item => {
          realMsgContent.push(item.msgContent);
          item.msgContent = item.msgContent.replace(/<a>|<\/a>|<abbr>|<\/abbr>|<address>|<\/address>|<article>|<\/article>|<aside>|<\/aside>|<b>|<\/b>|<bdi>|<\/bdi><bdo>|<\/bdo>|<big>|<\/big>|<blockquote>|<\/blockquote>|<br>|<\/br>|<caption>|<\/caption>|<center>|<\/center>|<cite>|<\/cite>|<code>|<\/code>|<col>|<\/col>|<colgroup>|<\/colgroup>|<dd>|<\/dd>|<del>|<\/del>|<div>|<\/div>|<dl>|<\/dl>|<dt>|<\/dt>|<em>|<\/em>|<fieldset>|<\/fieldset>|<font>|<\/font>|<footer>|<\/footer>|<h1>|<\/h1>|<h2>|<\/h2>|<h3>|<\/h3>|<h4>|<\/h4>|<h5>|<\/h5>|<h6>|<\/h6>|<header>|<\/header>|<hr>|<\/hr>|<i>|<\/i>|<img>|<\/img>|<ins>|<\/ins>|<label>|<\/label>|<legend>|<\/legend>|<li>|<\/li>|<mark>|<\/mark>|<nav>|<\/nav>|<ol>|<\/ol>|<p>|<\/p>|<pre>|<\/pre>|<q>|<\/q>|<rt>|<\/rt>|<ruby>|<\/ruby>|<s>|<\/s>|<section>|<\/section>|	<small>|<\/small>|	<span>|<\/span>|<strong>|<\/strong>|<sub>|<\/sub>|<sup>|<\/sup>|<table>|<\/table>|<tbody>|<\/tbody>|<td>|<\/td>|<tfoot>|<\/tfoot>|<th>|<\/th>|<thead>|<\/thead>|<tr>|<\/tr>|<tt>|<\/tt>|<u>|<\/u>|<ul>|<\/ul>| /g, '');
          return item
        })
        this.realMsgContent = realMsgContent;
        this.setData({
          messageArr: result
        })
      }
    } catch (error) {
      console.log(error);
    }

  },
  _setRead: async function (id) {
    const res = await setMesRead([id])
    console.log(res);
  }
})