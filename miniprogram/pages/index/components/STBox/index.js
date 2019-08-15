// pages/index/components/STBox/index.js
import { imageDomain } from '../../../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    imageDomain,
    headerHeight:0,
    headerStyle:'background-color:rgba(255,255,255,0.8);color:#516e88'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onback: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  oncheaderload:function(e){
    this.setData({ headerHeight: e.detail.height})
  },
  ondatechange:function(e){
    this.setData({ date: e.detail[0]})
  },
  //触发吸顶回调
  onSTitemchange:function(e){
    let bgcolor = '255,255,255', color ='#516e88';
    if (e.detail.isST){
      bgcolor = '28,85,136'; color = '#fff'
    }
    this.setData({
      headerStyle: 'background-color:rgba(' + bgcolor +',0.8);color:'+color
    })
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