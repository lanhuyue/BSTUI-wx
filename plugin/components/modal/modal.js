// common/components/modal/modal.js
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
    type: { type: String, value:"",observer :function(val){
      this.setData({ bodyClass:"modal-"+val})

    }},
    show: { type: Boolean, value: false, observer:function(val){
      this[val ? "show" :"hide"]()
    } },
    title: { type: Boolean, value: false },
    footer: { type: String, value: "" },
    bodyStyle: { type: String, value:""},//bodyCSS样式
    maskStyle: { type: String, value: ""},//maskCSS样式
    footerStyle: { type: String, value: ""},//footerCSS样式
    contentStyle: { type: String, value: ""},//contentCSS样式
    time:{type:Number,value:200},
    noMaskEvnet: { type: Boolean, value: false}
  },

  /**
   * 组件的初始数据
   */
  data: {
    boxHidden:true,//是否隐藏整个组件内容
    maskAnimation:{},//遮罩动画
    bodyAnimation:{},//body动画
    bodyClass:"",//body的样式类
  },
  attached:function(){
    //初始化动画实例
    var op={
      duration: this.data.time,
      timingFunction: "ease-out",
      transformOrigin: '50% 50% 0'
    }
    this.as=wx.createAnimation(op);
    this.ab=wx.createAnimation(op);
  },
  /**
   * 组件的方法列表
   */
  methods: {
      //显示
      show:function(){
        let noMaskEvnet = this.data.noMaskEvnet;
          this.setData({
            boxHidden: false
          });
          setTimeout(()=>{
            this.setData({
              maskAnimation: this.as.opacity("1").step().export(),
              bodyAnimation: this.getBodyAnimation("show")
            });
          },50);
          // if (!noMaskEvnet){
          //   this.setData({ noMaskEvnet: true})
          //   setTimeout(() => {
          //     this.setData({ noMaskEvnet:false})
          //   },500)
          // }
      },
      hide:function(){
        var self=this;
        this.setData({
          maskAnimation: self.as.opacity("0").step().export(),
          bodyAnimation: self.getBodyAnimation("hide")
        });
        setTimeout(function(){
          self.setData({
            boxHidden: true,
          });
          self.triggerEvent("hide")
        },this.data.time)
      },
      onMaskClick:function(){
        if (!this.data.noMaskEvnet){
          this.hide();
        }
      },
      //设置动画
      getBodyAnimation:function(sorh){
          var 
          modalType=this.data.type,
          ab=this.ab
          ;
          if(sorh=="show"){
            switch (modalType) {
              case "dialog":
                ab.translate('-50%', '-50%').scale(1).opacity("1");
                // ab.scale(1);
                break;
              case "drawer-bottom":
                ab.translate("-50%", "-100%");break;
              case "drawer-right":
                ab.translate("-100%","-50%");break;
              case "drawer-top":
                ab.translate("-50%", "100%"); break;
              case "drawer-left":
                ab.translate("100%", "-50%"); break;
            }
          }else{
            switch (modalType) {
              case "dialog":
                ab.translate('-50%', '-50%').scale(1.5).opacity("0");
                break;
              case "drawer-bottom":
                ab.translate("-50%", "0"); break;
              case "drawer-right":
                ab.translate("0", "-50%"); break;
              case "drawer-top":
                ab.translate("-50%", "0"); break;
              case "drawer-left":
                ab.translate("0", "-50%"); break;
            }
          }
          return ab.step().export()
      }
  }
})
