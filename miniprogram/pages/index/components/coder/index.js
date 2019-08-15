// pages/index/components/coder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1:"https://wap.tz12306.com",
    value2:"1234567890",
    inputV1: "https://wap.tz12306.com",
    inputV2: "1234567890"
  },
  createCoder:function(e){
    let index = e.currentTarget.dataset.typeindex;
    this.setData({ ["value" + index]:this.data["inputV"+index]})
  },
  oninput:function(e){
    let index = e.currentTarget.dataset.typeindex;
    this.setData({ ["inputV" + index]: e.detail.value})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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