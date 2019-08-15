// common/components/flexBox/flexBox.js
var classAndStyleSet=require("../../behaviors/class_style_set.js")
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [classAndStyleSet],
  /**
   * 组件的属性列表
   */
  properties: {
    //第一个容器的样式类
    startClass: {type: String,value: ''},
    //第一个容器的样式类
    endClass: { type: String, value: '' },
    //第一个的长度
    start: { type: String, value: ''},
    //第二个的长度
    end: { type: String, value: ''},
    //是否垂直排列
    vertical: { type: Boolean, value: false},
    //当前固定宽度的z-index
    noAutoZIndex: { type: String, value: ''}
  },

  /**
   * 组件的初始数据
   */
  data: {
      startStyle:"",
      endStyle:""
  },
  attached:function(){
    this.setData({
      startStyle: this.getStyle.call(this,"start"),
      endStyle: this.getStyle.call(this,"end")
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    testThis:function(e){
      console.log(this,"this")
    },
    getStyle:function(autoPsiton){
      var styleObj = { width: "auto" },
        start = this.data.start || "auto",
        end = this.data.end || "auto",
        noAutoZIndex = this.data.noAutoZIndex || 5,
        isVertical = this.data.vertical === true ? this.data.vertical : false;
     
      if (!isVertical) {//如果水平排列
        if (start == "auto" && end != "auto") {
          if (autoPsiton == "start") {
            styleObj.width = "100%";
            styleObj["padding-right"] = end;
            styleObj["margin-right"] = "-" + end;
          } else {
            styleObj.width = end;
            styleObj["z-index"] = noAutoZIndex;
          }
        } else if (start != "auto" && end == "auto") {
          if (autoPsiton == "end") {
            styleObj.width = "100%";
            styleObj["padding-left"] = start;
            styleObj["margin-left"] = "-" + start;
          } else {
            styleObj.width = start;
            styleObj["z-index"] = noAutoZIndex;
          }

        } else { return false }
      } else if (isVertical) {//如果垂直排列
        if (start == "auto" && end != "auto") {
          if (autoPsiton == "start") {
            styleObj.height = "100%";
            styleObj["padding-bottom"] = end;
            styleObj["margin-bottom"] = "-" + end;
          } else {
            styleObj.height = end;
            styleObj.zIndex = noAutoZIndex;
          }
        } else if (start != "auto" && end == "auto") {
          if (autoPsiton == "end") {
            styleObj.height = "100%";
            styleObj["padding-top"] = start;
            styleObj["margin-top"] = "-" + start;
          } else {
            styleObj.height = start;
            styleObj["z-index"] = noAutoZIndex;
          }

        } else { return false }
      }
      var str = JSON.stringify(styleObj).slice(1,-1).replace(/\,/g,";").replace(/"/g,"")
      return str
    }
  }
})
