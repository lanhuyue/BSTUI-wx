// pages/index/components/Cheader/index.js
import { imageDomain } from '../../../../utils/config.js'
let { formatCss,cssObjToString, mergeCssStr} = requirePlugin('BSTCommon')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageDomain,
    headerStyle:"background: linear-gradient(to right, #4FA4F9 , #356DA6);color:#fff",
    list:[
      {label:"纯色"},
      {label:"透明"},
      {label:"渐变"}
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onclick:function(e){
    let index = e.currentTarget.dataset.index, headerStyle = formatCss(this.data.headerStyle);
    switch(index){
      case 0:
        headerStyle.background ='#4FA4F9';
      break;
      case 1:
        headerStyle.background = 'rgba(79, 164, 249, 0.58)';
      break;
      case 2:
        headerStyle.background = 'linear-gradient(to right, #4FA4F9 , #356DA6)';
      break;
      // case 3:
      //   headerStyle.background = `url("${imageDomain}b3.png") no-repeat`;
      // break;
    }
    let str = cssObjToString(headerStyle);
    this.setData({ headerStyle: str})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onback:function(){
    wx.navigateBack({
      delta:1
    })
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