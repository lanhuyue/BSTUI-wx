// common/components/count/count.js
/**
 * count:计数器
 * --------------------------------------------------
 * props：{
 *      type:类型,可选值["img","default"]默认为default
 *      value:设置计数器的值,
 *      max:最大范围,
 *      min:最小范围,
 *      interval:递增/递减的间隔数,
 *      iconURL:icon图片的URL路径对象{R:[],P:[]}其中R为递减的图片路径集合，集合包含两个值；第一个为可点击状态，第二个为禁止点击状态；P为递增,
 *      textStyle:中间数字的样式,
 * }
 * events:{
 *      change:数字改变时候出发
 * }
 */

var classAndStyleSet = require("../../behaviors/class_style_set.js");
Component({
  behaviors: [classAndStyleSet],
  /**
   * 组件的属性列表
   */
  properties: {
    type: { type: String, value:"default"},
    value: {
      type: Number, value: 0, observer: function (newVal, oldVal, changedPath) {
        this.data.isInit&&this.updateText("", newVal)
      }
    },
    max: { type: Number, value: 100,observer: function (newVal, oldVal, changedPath) {
        this.data.isInit && this.updateText("")
      }},
    min: {
      type: Number, value: 0, observer: function (newVal, oldVal, changedPath) {
        this.data.isInit && this.updateText("")
      }},
    interval: { type: Number, value: 1},
    textStyle: { type: String, value: ""},
    iconURL: { type: Object, value: {"R":[],"P":[]}},
  },

  /**
   * 组件的初始数据
   */
  data: {
    text:"",
    RimgURL:"",
    PimgURL:"",
    isInit:false,
    pd:true,
    rd:true
  },
  attached:function(){
    this.updateText("", this.data.value)
    this.setData({ isInit:true})
  },
  /**
   * 组件的方法列表
   */
  methods: {
    calculation:function(e){
      var operator = e.currentTarget.dataset.operator;
      this.updateText(operator);
    },
    updateText: function (operator,value){
      var
        self = this,
        _type=this.data.type,
        mytext = value||this.data.text,
        beforText = value ||this.data.text,
        RimgURL = "",
        PimgURL = "",
        pd = true,
        rd = true
        ;
      switch (operator) {
        case "-":
          mytext = mytext - self.data.interval
          break;
        case "+":
          mytext = mytext + self.data.interval
          break;
        default:break
      }
      if (mytext <= self.data.min){
        mytext = self.data.min;
        rd=false;
        RimgURL = self.data.iconURL.R[1] || "";
        pd=true;
        PimgURL = self.data.iconURL.P[0] || ""
      }
      if (mytext >= self.data.max){
        mytext = self.data.max;
        pd=false;
        PimgURL = self.data.iconURL.P[1] || "";
        rd = true;
        RimgURL = self.data.iconURL.R[0] || ""
      }
      if (mytext > self.data.min && mytext < self.data.max){
        pd=true;rd=true;
        PimgURL = self.data.iconURL.P[0] || "";
        RimgURL = self.data.iconURL.R[0] || "";
      }
      // debugger
      this.setData({
        text: mytext,
        RimgURL: RimgURL,
        PimgURL: PimgURL,
        pd: pd,
        rd: rd,
      })
     beforText!=mytext&&this.triggerEvent('change', { value: mytext })
    }
  }
})
