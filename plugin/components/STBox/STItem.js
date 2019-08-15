// plugin/components/STBox/STItem.js
import {formatCss, hasKey, cssObjToString,mergeCssStr} from '../../api/data.js'
Component({
  relations: {
    './STBox': {
      type: 'ancestor', // 关联的目标节点应为祖父节点
      linked: function (target) {
        // 每次被插入到STBox时执行，target是STBox节点实例对象，触发在attached生命周期之后
        this._target = target
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    boxStyle: { type: String, value: "" },
    contentStyle: { type: String, value: "" },
    translateY: { type: Number, value: 0 },
    triggerOffset: { type: Number, value: 0 },
    STStyle: { type: String, value: "" }//吸顶时的样式
  },

  /**
   * 组件的初始数据
   */
  data: {
    isST: false,
    height: "",
    width: "",
    bodyStyle:""
  },
  ready: function () {
    setTimeout(()=>{
      this.setData({
        bodyStyle: this.data.contentStyle
      })
      let q = wx.createSelectorQuery().in(this)
      this.STIbox = q.select("#box");
      this.STIbody = q.select("#body");
      this.STIbox && this._target && this.STIbox.boundingClientRect((nodeInfor) => {
        this._target.pushItem({
          itemTop: nodeInfor.top - Number(this.data.triggerOffset),
          setST: this.setST.bind(this)
        })
      }).exec()
    },500)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setST:function(data){
      let 
        { triggerOffset, translateY, STStyle, contentStyle, boxStyle}=this.data,
      setStyle={};
      if (data.trigger){
        setStyle = mergeCssStr(
            contentStyle,
            this.bodyInfor ? { width: this.bodyInfor.width + "px", height: this.bodyInfor.height + "px"}:{},
            STStyle,
            { position: "fixed", top: triggerOffset + translateY + "px" }
          ) 
      }else{
        setStyle = mergeCssStr(contentStyle,{ position: "relative", top:"0" })
      }
      //初始化容器取值定型；
      if (!this.isInit ){
        this.STIbox.boundingClientRect((bodyInfor) => {
          this.isInit = true;
          this.setData({
            boxStyle: cssObjToString(mergeCssStr(boxStyle, "height:" + bodyInfor.height + "px:width:" + bodyInfor.width + "px"))
          });
        }).exec();
        this.STIbody.boundingClientRect((bodyInfor) => {
          this.bodyInfor = bodyInfor;
          this.isInit = true;
          this.setData({
            bodyStyle: cssObjToString(mergeCssStr({ height: bodyInfor.height + "px", width: bodyInfor.width + "px" }, setStyle))
          });
        }).exec();
      }else{
        this.setData({
          bodyStyle: cssObjToString(setStyle)
        });
      }
      this.triggerEvent("ST", { isST: data.trigger, translateY: data.translateYValue })
    },
  }
})
