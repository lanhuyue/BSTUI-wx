// common/components/tipser/tipser.js
var classAndStyleSet = require("../../behaviors/class_style_set.js")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{type:String,value:""},
    time: { type: Number, value: 7000 },
  },
  behaviors: [classAndStyleSet],
  /**
   * 组件的初始数据
   */
  data: {
    contentAnimation: {},//content动画
    contentWidth:"",//内容宽度
  },
  attached: function () {
    //初始化动画实例
    var op = {
      duration: this.data.time,
      // timingFunction: "ease-out"
    }
    this.as = wx.createAnimation(op);
  },
  ready:function(){
    var self=this;
    self.setAnimation()
  },
  detached:function(){
    this.timeId&&clearTimeout(this.timeId)
  },
  moved: function () {
    this.timeId && clearTimeout(this.timeId)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setAnimation:function(){
      let self=this;
      if (self.data.contentWidth){
          self.setData({
            contentAnimation: self.as.translate(-self.data.contentWidth, 0).step({ duration: self.data.time }).export()
          }, self.goA.bind(self))
        }else{
          self.createSelectorQuery().select('#contentText').boundingClientRect(function (rect) {
            // debugger
            self.setData({
              contentWidth: rect.width,
              contentAnimation: self.as.translate(-rect.width, 0).step({ duration: self.data.time }).export()
            }, self.goA.bind(self))
          }).exec();
        }
    },
    goA:function(){
      let self=this;
      self.timeId = setTimeout(function () {
        self.setData({ contentAnimation: self.as.translate("100%", "0").step({ duration: 0 }).export() }, self.setAnimation.bind(self))
      }, self.data.time)
    },
    onClick:function(e){
      this.triggerEvent('componenttap', { content: this.data.content})
    }
  }
})
