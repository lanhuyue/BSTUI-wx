// plugin/components/Cinput/Cinput.js
import { mergeCssStr, cssObjToString} from '../../api/data.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    boxStyle:{type:String,value:""},
    inputStyle:{type:String,value:""},
    value:{type:String,value:""},
    disabled:{type:Boolean,value:false},
    focus: { type: Boolean, value: false},
    confirmType: { type: Boolean, value: false},
    cursorSpacing: { type: Number, value: 0},
    maxlength: { type: Number, value: 140},
    placeholder:{type:String,value:""},
    placeholderStyle:{type:String,value:""},
    startIconURL:{type:String,value:""},//头部icon的图片路径
    startIconColor:{type:String,value:""},//头部icon的颜色
    startIconType: { type: String, value: "search" },//头部icon类型
    clearColor:{type:String,value:""},//清除icon的颜色
    type: { type: String, value: "text" }

  },

  /**
   * 组件的初始数据
   */
  data: {
    clearHidden:true,//清除按钮是否隐藏
    _inputStyle:""
  },
  attached:function(){
    let 
    cssObj={},
      { clearColor, startIconColor, inputStyle, startIconURL}=this.data;
    !clearColor && (cssObj.paddingRight="30rpx");
    !(startIconColor || startIconURL) && (cssObj.paddingLeft="30rpx");
    this.setData({ _inputStyle: cssObjToString(mergeCssStr(inputStyle, cssObj)) })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onclear:function(e){
      this.setData({ value: "", clearHidden: true});
      this.triggerEvent("input", {value:""})
    },
    oninput: function (e) { 
      
      let { value } = e.detail;
      this.setData({
        clearHidden:value.length>0?false:true,
        value
      });
      this.triggerEvent("input", e.detail)
      },
    onfocus: function (e) { 
      this.setData({
        clearHidden: this.data.value.length == 0
      });
      this.triggerEvent("focus", e.detail)
    },
    onblur: function (e) { 
      this.setData({
        clearHidden:true
      });
      this.triggerEvent("blur", e.detail)
      },
    onconfirm: function (e) { 
      this.triggerEvent("confirm", e.detail)
    },
  }
})
