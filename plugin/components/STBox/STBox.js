// plugin/components/scrollBox/scrollBox.js
import { formatCss, hasKey} from '../../api/data.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollTop: { type: Number, value: 0 },
    boxStyle: { type: String, value: "" }
  },
  relations: {
    './STItem': {
      type: 'descendant', // 关联的目标节点应为孙子节点
    }
  },
  ready:function(){
    this.sb = wx.createSelectorQuery().in(this).select("#stb");
  },
  /**
   * 组件的初始数据
   */
  data: {},
  created: function () { this.STData={}},
  /**
   * 组件的方法列表
   */
  methods: {
    //添加item
    pushItem:function(itemObj){
      if (["itemTop","setST"]){
        if (!this.offsetTop){
          this.sb.boundingClientRect((nodeInfor)=>{
            this.offsetTop = nodeInfor.top;
            this.STData["bst_" + (itemObj.itemTop - this.offsetTop)] = {isAdsorbent: false, setST: itemObj.setST};
          }).exec()
        }else{
          this.STData["bst_" + (itemObj.itemTop - this.offsetTop)] = { isAdsorbent: false, setST: itemObj.setST };
        }
      }
    },
  //滚动时触发回调
    scrollFun: function(e) {
      let
        top = (e.detail.scrollTop).toFixed(0),
         STData  = this.STData;
      Object.keys(STData).forEach((key) => {
        let myNum = key.replace("bst_", "");
        if (Number(top) >= Number(myNum)) {
          if (!STData[key].isAdsorbent) {
            STData[key].setST(Object.assign({
              trigger: true,
              translateYValue: this.offsetTop
            }, e.detail))
            STData[key].isAdsorbent = true;
          }
        } else {
          if (STData[key].isAdsorbent) {
            STData[key].setST(Object.assign({
              trigger: false,
              translateYValue: 0
            }, e.detail))
            STData[key].isAdsorbent = false;
          }
        }
      });
      this.triggerEvent("scroll", e.detail)
    }
  }
})
