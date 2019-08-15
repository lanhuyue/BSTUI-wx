// pages/index/index.js
import { imageDomain}from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageDomain,
    componentsRouter:[
      { name: "Cheader", introduce:"自定义导航栏"},
      { name: "coder", introduce:"条形码/二维码"},
      { name: "queue", introduce:"队列（组）"},
      { name: "modal", introduce:"基础模态框"},
      { name: "dialog", introduce:"模态弹窗"},
      { name: "calendar", introduce:"日历"},
      { name: "dateSelector", introduce:"日历选择器"},
      { name: "drawer", introduce:"抽屉盒子"},
      { name: "STBox", introduce:"滚动吸顶盒子（组）"},
      { name: "Cslider", introduce:"滑块组件"},
      { name: "Ctab", introduce:"选项卡（组）"},
      { name: "Cinput", introduce:"输入框"},
      { name: "LSDrawer", introduce:"左滑抽屉盒子"},
      { name: "flexBox", introduce:"双栏弹性盒子"},
      { name: "count", introduce: "计数器" },
      { name: "button", introduce: "按钮组件" },
      { name: "fontIcon", introduce: "字体图标" },
    ],
    headerBG:"transparent"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onscroll: function ({ detail }){
    this.setData({ headerBG: "rgba(34, 130, 228," + (detail.scrollTop > 80 ? 0.8 : detail.scrollTop/100)+")" })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let f = wx.getFileSystemManager();
    // f.access({
    //   path: "../../utils/config.js",
    //   success: function (res) {
    //     console.log(res, "--------")
    //   },
    //   fail: function (er) {
    //     console.log(er, "--------")
    //   }
    // })
  },
  oner:function(er){
    console.log(er,"///")
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