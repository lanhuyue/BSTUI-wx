
import { formatCss, cssObjToString, mergeCssStr} from '../../api/data.js'
// plugin/components/queue/queueItem.js
Component({
  relations: {
    './queue': {
      type: 'ancestor', // 关联的目标节点应为祖父节点
      linked: function (target) {
        // 每次被插入到queue时执行，target是queue节点实例对象，触发在attached生命周期之后
        let 
          { type, column, newItemStyle } = target.data;
        target.pushItem((ns)=>{
          this.setData({ itemStyle:ns})
        })
        this.setData({type})
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    itemStyle: { type: String, value: "" },//item样式
  },

  /**
   * 组件的初始数据
   */
  data: {
    type:"list"
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
