// common/components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      save:{type:String,value:""},
      openType:{type:String,value:""},//微信开放能力
      bodyStyle:{type:String,value:""},
      cancelStyle:{type:String,value:""},
      saveStyle:{type:String,value:""},
      cancel:{type:String,value:""},
      noMaskEvnet: { type: null, value: false},
      show: {
        type: Boolean, value: false, observer: function (val) {
          this[val ? "show" : "hide"]()
        }
      },
  },

  /**
   * 组件的初始数据
   */
  data: {
     setContent:"",
     isShow:false,
     apiSetContentShow:false
  },
  attached:function(){
    this.triggerEvent("examplePipe", { example: this })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onSaveClick:function(e){
      // console.log(e,"eeeeeeeeeeeeeeeeeeeee")
      if ((this.data.openType && (e.type != 'tap')) || (!this.data.openType && (e.type == 'tap'))){
        this.triggerEvent("saveCallback", e.detail);
        var flag = false
        if (this.setObj && this.setObj.saveCallback) {
          flag = this.setObj.saveCallback.call(this, e.detail)
        }
        (!flag) && this.hide()
      }
     
    },
    onCancelClick: function () {
      this.triggerEvent("cancelCallback");
      var flag=false
      if (this.setObj&&this.setObj.cancelCallback){
        flag = this.setObj.cancelCallback(this)
      }
      (!flag)&&this.hide()
    },
    onHide:function(){
      this.triggerEvent("hide");
      this.hide();
      this.setData({ apiSetContentShow: false});
      this.setObj &&this.setObj.hideCallback && this.setObj.hideCallback.call(this);
    },
    show: function (setObj) {
        setObj && (this.setObj = setObj);
        if (setObj) {
          this.setObj = setObj;
          let apiSetdata = {};
          if (setObj.content) {
            apiSetdata = {
              setContent: setObj.content,
              apiSetContentShow: true,
            }
          };
          // debugger
          Object.keys(setObj).forEach((key, index) => {
            if (this.data.hasOwnProperty(key)) {
              apiSetdata[key] = setObj[key]
            }
          });
          this.setData(apiSetdata, () => {
            this.setData({ isShow: true })
          })
        } else {
          this.setData({ isShow: true })
        }
    },
    hide: function () { this.setData({ isShow: false }) },
  }
})
