// common/components/drawer/drawer.js
var classAndStyleSet = require("../../behaviors/class_style_set.js")
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [classAndStyleSet],
  /**
   * 组件的属性列表
   */
  properties: {
    titleStyle:{type:String,value:""},
    contentStyle:{type:String,value:""},
    time: { type: Number, value: 200 },
    switch: {
      type: Boolean, value: false, observer: function (val) {
        this[val ? "opne" : "close"]()
      } },
    iconRotate: { type: Array, value: ["45","135"] },
  },

  /**
   * 组件的初始数据
   */
  data: {
    titleAnimation:{},
    contentAnimation:{},
    isOpen:false,//是否展开
  },
  attached: function () {
    //初始化动画实例
    var op = {
      duration: this.data.time,
      timingFunction: "ease-out",
      transformOrigin: "70% 30% 0"
    }
    this.at = wx.createAnimation(op);
    this.ac = wx.createAnimation(op);
    this.triggerEvent("examplePipe", { example: this })
    //缓存DOM对象
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTitleClick:function(e){
      if (this.data.isOpen){
        this.close()
      }else{
        this.opne()
      }
    },
    //展开
    opne:function(){
      var self=this;
      this.createSelectorQuery().select('#contentBox').boundingClientRect(function (rect) {
        self.setData({
          titleAnimation: self.at.rotateZ(self.data.iconRotate[1]).step().export(),
          contentAnimation: self.ac.height(rect.height).step().export(),
        })
      }).exec();
      this.data.isOpen = true
    },
    // 关闭
    close:function(){
      this.setData({
        titleAnimation: this.at.rotateZ(this.data.iconRotate[0]).step().export(),
        contentAnimation: this.ac.height(0).step().export(),
      });
      this.data.isOpen = false
    },
  }
})
