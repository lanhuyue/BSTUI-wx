// plugin/components/queue/queue.js
import { formatCss, cssObjToString, mergeCssStr } from '../../api/data.js'
Component({
  relations: {
    './queueItem': {
      type: 'descendant', // 关联的目标节点应为孙子节点
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    //equipartition、list、auto
    type: { type: String, value: "list", observer:function(val,old){
      if (val && old&&(JSON.stringify(val)!=JSON.stringify(old))){
        this.initItemStyle(this.data.itemStyle);
      }
    }},//队列类型
    itemStyle: { type: String, value: "", observer: function (val, old){
      if (val && old && (JSON.stringify(val) != JSON.stringify(old))) {
        this.initItemStyle(val);
      }
    }},//item样式
    boxStyle:{type:String,value:""},//box样式
  },

  /**
   * 组件的初始数据
   */
  data: {
      listNum:0,
      column:1,
      newItemStyle:"",
      tanceStyle:""
  },
  ready:function(){
    this.initItemStyle(this.data.itemStyle);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pushItem: function (fun) {
      let listNum = this.data.listNum;
      listNum++;
      this.setData({ listNum: listNum });
      !this.dispachItemStyles && (this.dispachItemStyles=[]);
      fun&&this.dispachItemStyles.push(fun);
    },
    initItemStyle: function (value) {
      var 
      self=this;
      switch(this.data.type){
        case "equipartition":
          self.initEquipartitionStyle(value,self.initListADNAutoStyle.bind(self));
          break;
        case "list":
        case "auto":
          self.initListADNAutoStyle(value)
          break;
      }
    },
    initListADNAutoStyle: function (itemStyle){
      this.setData({
        newItemStyle:itemStyle,
      });
      this.dispachItemStyles&&this.dispachItemStyles.forEach((setStyleFun) => {
        setStyleFun(itemStyle)
      })
    },
    //初始化equipartition的样式
    initEquipartitionStyle: function (value,fun){
      let
        sObj = formatCss(value, /(^marginLeft$)|(^marginRight$)/),
        newStyleObj = mergeCssStr({ width: "30%" }, sObj),
        newStyle = cssObjToString(newStyleObj),
        tanceStyle = cssObjToString({ width: newStyleObj.width, border: newStyleObj.border || '' })
        ;
      if (/px/.test(newStyleObj.width)) {
        setTimeout(() => {
          wx.createSelectorQuery().in(this).select('#qBox').boundingClientRect((rect) => {
            let
              pixelRatio = wx.getSystemInfoSync().pixelRatio,
              boxWidth = (/rpx$/.test(newStyleObj.width) ? pixelRatio : 1) * rect.width;
            this.setData({
              tanceStyle: tanceStyle,
              // newItemStyle: newStyle,
              column: Math.floor(boxWidth / parseFloat(newStyleObj.width))
            });
            fun && fun(newStyle)
          }).exec()
        })
      } else {
        this.setData({
          column: Math.floor(100 / parseFloat(newStyleObj.width)),
          tanceStyle: tanceStyle,
        });
        fun && fun(newStyle)
      }
    },
  }
})
