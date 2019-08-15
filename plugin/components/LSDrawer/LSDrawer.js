// plugin/components/SDrawer/SDrawer.js
import { Displacementer, myFor } from '../../api/data.js'
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    slidingDistance:{type:String,value:"30%"},
    hiddenValue:{type:String,value:"删除"},
    hiddenStyle:{type:String,value:""},
    customHidden:{type:Boolean,value:false},
    data:{type:null,value:""},//传递数据
    isOpen: { type: Boolean, value: false, observer:function(val){
      let 
      r = this.moveRange ;
      if(r.length==2){
        this.setContentTranslatX(r[0])
      }
       
    }},//传递数据
  },

  /**
   * 组件的初始数据
   */
  data: {
    contentTranslateX: 0,
    animation: "all 0.2s ease-out",
    hiddenWidth:"",
    boxHidden:false
  },
  created: function () {
    this.moveRange = [];//滑动范围
    this.D = new Displacementer()
  },
  ready:function(){
    let 
    w=0,
    hw=0,
    { slidingDistance,isOpen }=this.data;

      wx.createSelectorQuery().in(this).select("#box").boundingClientRect((nodeData) => {
        if (/^\d+(px)?$/.test(slidingDistance)) {
          w = parseInt(slidingDistance);
          hw = w + "px"
        }
        if (/^\d+%$/.test(slidingDistance)) {
          w = nodeData.width * (parseFloat(slidingDistance) % 100) / 100;
          hw = slidingDistance
        }
        this.moveRange = [-w, 0];
        this.D.setRange([-w, 0]);
        this.setData({
          hiddenWidth: hw,
          boxHeight: nodeData.height
        }) 
        this.setContentTranslatX(-w)
      }).exec()
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    setContentTranslatX: function (w) {
      let
        { isOpen } = this.data,
        cx = (isOpen ? w : 0);
      this.setData({
        contentTranslateX: cx + "px"
      })
      this.D.save(cx)
    },
    onclick:function(e){
        let {data}=this.data;
        this.setData({boxHeight:0 })
        setTimeout(()=>{
          this.setData({ boxHidden: true});
          this.triggerEvent("clear", data);
        },200)
    },
    onstart:function(e){
      if (e.touches.length == 1) {
        this.isTap = true;
        let touch = e.touches[0];
        this.D.init(touch.clientX, touch.clientY);
        this.setData({ animation: "none" })
      }
    },
    onmove:function(e){
      if (this.isTap && (e.touches.length == 1)) {
        let
          touch = e.touches[0],
          touchData = this.D.getData(touch.clientX, touch.clientY),//计算后的touch对象
          moveX = touchData.cacheMoveX + touchData.moveX//移动的绝对距离
          ;

        this.rangeSwitch(moveX, this.moveRange, {
          left: (value) => { this.isTap = false },
          right: (value) => { this.isTap = false },
          common: (value) => {
            this.setData({ contentTranslateX: value + "px" });
          }
        });
      }
    },
    onend:function(e){
      this.isTap = false;
     let 
       { data}=this.data,
      moveX = this.D.cacheMoveX + this.D.moveX;

      moveX = moveX > this.moveRange[0] *2/ 3 ? 0 : this.moveRange[0];

      this.rangeSwitch(moveX, this.moveRange, {
        common: (value) => {
          this.setData({
            animation: "all 0.2s ease-out",
            contentTranslateX: value + "px",
          })
          this.D.save(value);
          this.triggerEvent("change", { data,isOpen:value!=0});
        }
      });
      
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
