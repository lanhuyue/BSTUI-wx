// miniprogram/pages/index/components/Cslider/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      { label: "25%", value: [25], type: "default", mode: "ratio"},
      { label: "良好", value: ['良好'], type: "default", mode: "custom", scale: ["不及格", "及格", "良好", "优秀", "天才"]},
      { label: "10%~94%", value: [10,94], type: "range", mode: "ratio"},
      { label: "及格-良好", value: ['及格', '良好'], type: "range", mode: "custom", minRange:1,scale: ["不及格", "及格", "良好", "优秀", "天才"]},
      { label: "良好-优秀", value: ['良好', '优秀'], type: "range", mode: "custom", minRange:0,scale: ["不及格", "及格", "良好", "优秀", "天才"]}
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onsliderchange:function(e){
    
    let index = e.currentTarget.dataset.index,
        list = JSON.parse(JSON.stringify(this.data.list)),
        value='';
    switch(index){
      case 0: value = e.detail[0] + "%";break;
      case 1: value = e.detail[0];break;
      case 2: value = e.detail.map(item => item + "%").join("~");break;
      case 3: value = e.detail.join("~");break;
      case 4: value = e.detail.join("~");break;
      default: value = e.detail
    }
    list[index].label = value
    this.setData({list})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})