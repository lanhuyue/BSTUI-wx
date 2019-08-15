// miniprogram/pages/index/components/button/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      wxIcon1:{
        type: 'wxIcon', 
        iconType: 'search', 
        Size: 15,
        color: '#fff',
        position: 'left',
        spacing: 15 
      },
      wxIcon2: {
        type: 'wxIcon',
        iconType: 'success_no_circle',
        Size: 15,
        color: '#fff',
        position: 'right',
        spacing: 15 
      },
      wxIcon3: {
        type: 'wxIcon',
        iconType: 'warn',
        Size: 15,
        color: '#fff',
        position: 'left',
        spacing: 15 
      },
      smallIcon:{
        type: 'wxIcon',
        iconType: 'info',
        Size: 12,
        color: '#4FA4F9',
        position: 'left',
        spacing: 8 
      },
      urlIcon:{
        type: 'urlIcon',
        position: 'left',
        spacing: 8,
        source: 'https://miniapp.scqcp.com/images/bianji@2x.png',   //urlIcon 必传
        sourceSise: [20, 20],//表示图片图标大小 单位rpx
      },
      urlIcon1:{
        type: 'urlIcon',
        position: 'left',
        spacing: 15,
        source: 'https://miniapp.scqcp.com/images/btn_LRadio_normal@3x.png',   //urlIcon 必传
        sourceSise: [35, 35],//表示图片图标大小 单位rpx
      },
      urlIcon2: {
        type: 'urlIcon',
        position: 'right',
        spacing: 15,
        source: 'https://miniapp.scqcp.com/images/gai_location.png',   //urlIcon 必传
        sourceSise: [35, 35],//表示图片图标大小 单位rpx
      },
      fontIcon:{
        type: 'fontIcon',
        position: 'left',
        spacing: 15,
        iconType:'BST-12306',
        Size:40,
        color:'#f00',
      },
      fontIcon2: {
        type: 'fontIcon',
        position: 'right',
        spacing: 15,
        iconType: 'BST-round-tick',
        Size: 40,
        color: '#000',
      },
      fontIcon3: {
      type: 'fontIcon',
      position: 'right',
      spacing: 15,
      iconType: 'BST-date',
      Size: 40,
      color: '#fff',
    },
      
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
  tap(){
      console.log("555")
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