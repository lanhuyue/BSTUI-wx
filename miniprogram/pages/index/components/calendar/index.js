// miniprogram/pages/index/components/calendar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markerData:{
      "2019-08-08": { bottom:"立秋"},
      "2019-08-15": { bottom:"中元节"},
      "2019-08-23": { bottom:"处暑"},
      "2019-09-08": { bottom:"白露"},
      "2019-09-10": { bottom:"教师节"},
      "2019-09-13": { top:"休", bottom:"中秋"},
      "2019-09-14": { top:"休"},
      "2019-09-15": { top:"休"},
      "2019-09-23": { bottom:"秋分"},
      "2019-09-29": { top:"班"}
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  ondatechange:function(e){
    console.log(e)
  },
  oncheckStart:function(e){
    console.log(e)
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