// miniprogram/pages/index/components/queue/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemWidth:"23%",
    list:[
        {label:"瓜众1",url:""},
        {label:"瓜众2",url:""},
        {label:"瓜众3",url:""},
        {label:"瓜众4",url:""},
        {label:"瓜众5",url:""},
        {label:"瓜众6",url:""},
        {label:"瓜众7",url:""},
        {label:"瓜众8",url:""},
        {label:"瓜众9",url:""},
        {label:"瓜众10",url:""}
      ],
    list2:[
      { label: "瓜众1", url: ""},
      { label: "胖瓜众1", url: ""},
      { label: "胖胖胖胖瓜众1", url: ""},
      { label: "瓜众1", url: ""},
      { label: "胖瓜众1", url: ""},
      { label: "胖胖胖瓜众1", url: ""},
      { label: "瓜众1", url: ""},
      { label: "胖瓜众1", url: ""},
      { label: "胖胖胖胖瓜众1", url: ""},
      { label: "胖胖胖胖胖胖胖胖瓜众1", url: ""},
      { label: "胖胖瓜众1", url: ""},
    ],
    equipartitionValue: ["23%"],
    equipartitionScale: ["18%", "23%", "30%", "40%"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onsliderchange:function(e){
    this.setData({ itemWidth:e.detail[0]})
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