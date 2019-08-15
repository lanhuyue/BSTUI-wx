// plugin/components/Ctab/CtabItem.js
Component({
  relations: {
    './Ctab': {
      type: 'ancestor', // 关联的目标节点应为祖父节点
      linked: function (target) {
        // 每次被插入到STBox时执行，target是STBox节点实例对象，触发在attached生命周期之后
        let { title, data, icon}=this.data;
        
        target.pushItem({
          label: title, data, icon
        })
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
      title:{type:String,value:"title"},
      data:{type:null,value:''},
      icon:{type:String,value:''},
      itemStyle: { type: String, value: '' }
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

  }
})
