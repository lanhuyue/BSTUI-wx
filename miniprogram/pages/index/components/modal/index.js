// pages/index/components/modal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modaltype:"dailog",//modal类型
    modalshow:false,//modal显示与隐藏
    modalContent:"我是dailog",//modal的内容
    buttonData:[
      { modalShow: false, type:"dialog"},
      { modalShow: false, type:"drawer-bottom"},
      { modalShow: false, type:"drawer-right"},
      { modalShow: false, type:"drawer-top"},
      { modalShow: false, type:"drawer-left"},
    ]
  },
  onButtonClick:function(e){
    let index = e.currentTarget.dataset.index,
      buttonData = JSON.parse(JSON.stringify(this.data.buttonData))
    ;
    buttonData[index].modalShow=true;
    this.setData({
      buttonData
    })
  },
  onmodalhide:function(e){
    let index = e.currentTarget.dataset.index,
        buttonData = JSON.parse(JSON.stringify(this.data.buttonData))
        ;
      buttonData[index].modalShow = false;
      this.setData({
        buttonData
      })
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