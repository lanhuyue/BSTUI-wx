// common/components/BSTcheckboxGroup/BSTcheckboxGroup.js
Component({
  relations: {
    './checkbox': {
      type: 'descendant', // 关联的目标节点应为父节点
    }
  },
  /**
   * 组件的属性列表[]
   */
  properties: {//["single","multiple"]
    type: { type: String, value: "multiple" },
  },
  
  /**
   * 组件的初始数据
   */
  data: {
  },
  created:function(){
      this.items=[];
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pushItem: function (item){
      this.items.push(item);
    },
    removeItem: function (id) {
      let items=this.items
      for (let i = 0, n = items.length;i<n;i++){
        if (id==items[i].id){
          this.items = items.splice(i,1);break
        }
      }
    },
    upDate: function (item) {
      let checkeds = [], nowClickIndex=0,nowItem={};
      this.items = this.items.map(function(obj,index){
        let newItem ;
        if (item.id == obj.id){
          newItem = item;
          nowClickIndex=index;
          nowItem = item
        }else{
          newItem = obj;
        }
        if (newItem.checked){
          checkeds.push(newItem.data)
        }
        return newItem
      });
      this.triggerEvent("change", { nowClickIndex, checkeds, nowItem})
    }
  }
})
