// pages/index/components/dialog/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareavalue:"这个可以是HTML字符串，比如<span style='color:red'>红色</span>；具体标签支持请看小程序rich-text文档"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  ondialog3examplePipe:function(e){
    this.commonTips = e.detail.example
  },
  showdialog:function(e){
    let 
    self=this,
    index = e.currentTarget.dataset.index;
    switch(index){
      case '1':
      case '2':
        self.setData({ ['dialogShow'+index]:true});break;
      case '3':
        self.commonTips && self.commonTips.show({
          saveStyle:"color:#516e88",
          content: this.data.textareavalue||"这是js实例调用内容"
        });break;
    }
  },
  hidedialog:function(e){
    let
      self = this,
      index = e.currentTarget.dataset.index;
    switch (index) {
      case '1':
      case '2':
        self.setData({ ['dialogShow' + index]: false }); break;
    }
  },
  ontextareaInput:function(e){
    this.setData({ textareavalue: e.detail.text})
  },
  ondialog2click:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  //编辑器渲染完毕
  onEditorReady() {
    wx.createSelectorQuery().select('#editor').context( (res) =>{
      this.editorCtx = res.context;
      this.editorCtx.insertText({
        text: this.data.textareavalue
      })
    }).exec()
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