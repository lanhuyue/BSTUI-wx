// plugin/components/Cheader/Cheader.js
import { mergeCssStr, cssObjToString, formatCss} from '../../api/data.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    boxStyle: {type: String, value: "", observer: function (val) {
      let 
        { boxPaddingTop, height} = this.data,
        css = formatCss(val || "")
      ;
      val && this.setData({ 
        _boxStyle: cssObjToString(mergeCssStr(css, "height:" + (css.height || height)+ "px;padding-top:" + boxPaddingTop+"px")),
          iconColor: css.color||""
        })
    }},
    leftStyle: { type: String, value: "" },
    noBack: { type: Boolean, value: false },
    centerStyle: { type: String, value: "" },
    backWidth: { type: String, value: "50px" },
    backZindex: { type: String, value: "5" },
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 45,
    iconColor:"",
    boxPaddingTop:0,
    _boxStyle:""
  },
  created:function(){
   
  },
  attached:function(){
    this.getStateLineHeight((height, boxPaddingTop)=>{
      let { boxStyle, leftStyle, centerStyle, backWidth, backZindex} = this.data;
      this.triggerEvent("examplePipe", { height: height});
      // console.log(cssObjToString(mergeCssStr(boxStyle || "", "height:" + height + "px;padding-top:" + boxPaddingTop + "px")),1)
      this.setData({
        _boxStyle: cssObjToString(mergeCssStr(boxStyle || "", "height:" + height + "px;padding-top:" + boxPaddingTop+"px")),
        leftStyle: cssObjToString(mergeCssStr(leftStyle, "width:" + backWidth + ";margin-right:-" + backWidth + ";z-index:" + backZindex)),
        centerStyle: cssObjToString(mergeCssStr("padding-right:" + backWidth, centerStyle, "padding-left:" + backWidth))
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getStateLineHeight(callback) {
      let { height } = this.data;
          wx.getSystemInfo({
            success:  (res)=> {
              height += res.statusBarHeight;
              this.setData({
                height: height,
                boxPaddingTop: res.statusBarHeight
              },()=>{
                callback && callback(height, res.statusBarHeight)
              });
            }
          });
    },
    navback() {
      this.triggerEvent("back");
    }
  }
})
