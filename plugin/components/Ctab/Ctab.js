// common/components/tab/tab.js
import { Displacementer, myFor } from '../../api/data.js'
var classAndStyleSet = require("../../behaviors/class_style_set.js")
Component({
  relations: {
    './CtabItem': {
      type: 'descendant', // 关联的目标节点应为孙子节点
    }
  },
  behaviors: [classAndStyleSet],
  /**
   * 组件的属性列表
   */
  properties: {
    current: { type: Number, value: 0, observer: function (val) {
        if (this.unitLength){
          let
            { titleData } = this.data,
            i = val > titleData.length ? titleData.length : val < 0 ? 0 : val
            ;
          this.setCheckedItem(i)
        }
      } },//当前所在滑块的 index
    titleItemWidth:{type:Number,value:100},
    titleCheckedStyle: { type: String, value: "" },// 选中的title样式
    //是否垂直排列
    vertical: { type: Boolean, value: false },
  },

  /**
   * 组件的初始数据
   */
  data: {
    titleData:[],
    contentTranslateX:0,
    checkedIndex:0,//当前选择的itemindex
    showItemHalfNum:0,//显示当前item的一半个数
    animation:"transform 0.2s ease-out"
  },
  created:function(){
    this.unitLength=0;//单位长度
    this.moveRange=[];//滑动范围
    this.D = new Displacementer()
  },
  ready: function () {
    wx.createSelectorQuery().in(this).select("#content").boundingClientRect((nodeData)=>{
      this.unitLength=nodeData.width;
      this.moveRange = [-nodeData.width * (this.data.titleData.length - 1), 0];
      this.D.setRange([-nodeData.width * (this.data.titleData.length - 1), 0]);
      let 
      { current, titleData}=this.data,
        i = current > titleData.length ? titleData.length : current < 0 ? 0 : current
      ;
      this.setData({ showItemHalfNum:Math.floor(nodeData.width / this.data.titleItemWidth/2)})
      this.setCheckedItem(i)
    }).exec()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pushItem:function(itemObj){
      let 
        { current}=this.data,
      list=JSON.parse(JSON.stringify(this.data.titleData));
      itemObj.checked = list.length == current?true:false;
      list.push(itemObj)
      this.setData({ titleData: list})
    },
    onContentScroll:function(e){
      // console.log(e.detail,"-------")
    },
    //设置选中item与content偏移值同步
    setCheckedItem:function(index){
      // if (this.data.checkedIndex != index){
        let
          list = JSON.parse(JSON.stringify(this.data.titleData)),
          value = -index * this.unitLength;

        list = list.map((item, i) => {
          if (index == i) {
            item.checked = true;
          } else {
            item.checked = false;
          }
          return item
        });

        this.setData({
          checkedIndex: index,
          animation: "transform 0.2s ease-out",
          contentTranslateX: value + "px",
          titleData: list
        })
        this.D.save(value);
        let data = JSON.parse(JSON.stringify(list[index]));
        delete data.checked;
        this.triggerEvent("change", data)
      // }
      
    },
    //title点击回调
    onTitleClick:function(e){
      let 
      { index, data } = e.currentTarget.dataset;
      this.setCheckedItem(index);
      this.triggerEvent("titleClick", { index,data })
    },
    onTouchStart:function(e){
      if (e.touches.length == 1) {
          this.isTap = true;
          let touch = e.touches[0];
          this.D.init(touch.clientX, touch.clientY); 
        this.setData({ animation:"none"})
      }
      // this.triggerEvent("change", e.detail)
    },
    onTouchMove: function (e) { 
      if (this.isTap && (e.touches.length == 1)){
        let 
          touch = e.touches[0],
          touchData = this.D.getData(touch.clientX, touch.clientY),//计算后的touch对象
          moveX = touchData.cacheMoveX + touchData.moveX//移动的绝对距离
          ;
        this.rangeSwitch(moveX, this.moveRange, {
              left:  (value) => { this.isTap = false },
              right: (value) => { this.isTap = false },
              common: (value) =>  {
                this.setData({ contentTranslateX: value + "px" });
                this.triggerEvent("itemmove", { index: Math.floor(Math.abs(value / this.unitLength))})
              }
          });
      }
    },
    onTouchEnd: function (e) { 
      this.isTap = false;
      let 
        ratio=0,
        unitLength = this.unitLength,
        moveX = Math.abs( this.D.cacheMoveX + this.D.moveX)
        ;
        if (this.D.moveX < 0){
          if (Math.abs(this.D.moveX) >= (unitLength / 3)){
              ratio = Math.ceil(moveX / unitLength)
              // debugger
            }else{
              ratio = Math.floor(moveX / unitLength)
              // debugger
            }
        }else{
          if (Math.abs(this.D.moveX)>= (unitLength / 3)) {
              ratio = Math.floor(moveX / unitLength)
            } else {
              ratio = Math.ceil(moveX / unitLength);
              if (this.D.cacheMoveX >= 0) { ratio=0}
            }
        }
        this.rangeSwitch(-ratio * unitLength, this.moveRange, {
          common: (value) => {
            let i = Math.abs( Number(value / unitLength).toFixed(0));
            this.setCheckedItem(i);
          }
        });
      // this.triggerEvent("move", e.detail)
    },
    rangeSwitch: function (value, rangeAry, boundary) {
      if (value < rangeAry[0]) {
        boundary.left && boundary.left(rangeAry[0]);
        boundary.common && boundary.common(rangeAry[0])
      }
      if (value > rangeAry[1]) {
        boundary.right && boundary.right(rangeAry[1]);
        boundary.common && boundary.common(rangeAry[1])
      }
      if (value >= rangeAry[0] && value <= rangeAry[1]) {
        boundary.center && boundary.center(value);
        boundary.common && boundary.common(value)
      }
    }
  }
})
