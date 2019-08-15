// common/components/BSTcheckbox/BSTcheckbox.js
var classAndStyleSet = require("../../behaviors/class_style_set.js")
Component({
  relations: {
    './checkbox-group': {
      type: 'ancestor', // 关联的目标节点应为父节点
      linked: function (target) {
        // 每次被插入到BSTcheckboxGroup时执行，target是BSTcheckboxGroup节点实例对象，触发在attached生命周期之后
        target.pushItem({
          id: this.__wxExparserNodeId__,
          checked:this.data.checked,
          data:this.data.data
        })
        this.parent=target
      }
    }
  },
  behaviors: [classAndStyleSet],
  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: Array, value: [
        "https://miniapp.scqcp.com/images/btn_checkbox_checked@2x.png",
        "https://miniapp.scqcp.com/images/main_btn_box_abnor-@2x.png"
      ]},
    checked: { type: Boolean, value: false, observer:function(value){
      this.update(value)
    }},
    data: {type: null, value: ""},
    disabled: { type: Boolean, value: false },
    iconStyle: { type: String, value: "" },
    iconWidth: { type: String, value: "" },
  },
  

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckBoxClick:function(e){
      if (this.data.disabled) {
        return false
      }
      this.update()
    },
    update: function (checked){
      let c = checked != undefined ? checked : !this.data.checked;
      if (checked==undefined){
        this.parent && this.parent.upDate({
          id: this.__wxExparserNodeId__,
          checked: c,
          data: this.data.data
        })
        this.triggerEvent("change", { checked: c, data: this.data.data })
      }
      this.setData({ checked: c });
    }
  }
})
