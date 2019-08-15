// plugin/components/Cslider/Cslider.js
import { Displacementer, initAryforJSON,} from '../../api/data.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {type: Array, value: [], observer: function (val,old) {
        (JSON.stringify(val) != JSON.stringify(old))&&this.init(val);
      }},//选择的值
    scale: {type: Array, value: [], observer: function (val, old) {
      (JSON.stringify(val) != JSON.stringify(old)) &&this.init();
      }},//备选数据
    mode: { type: String, value: 'ratio', observer:function(val){
      if (['ratio', 'custom'].indexOf(val) == -1) {
        throw new Error("slider 参数错误（mode）" + val)
      }
    }},//ratio：比例刻度（最多100%）；custom：自定义刻度
    type: {type: String, value: 'default', observer: function (val) {
      if (['range', 'default'].indexOf(val) == -1) {
        throw new Error("slider 参数错误（type）" + val)
        }
      }},//default单选取值；range范围取值
    minRange: { type: Number, value: 1 },
    valueKey: { type: String, value: 'bst_value' } ,//对比取值的KEY
    checkedColor: { type: String, value: "#38A8F6"},
    unCheckedColor: { type: String, value: "#CCCCCC" },
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftMaskWidth: 0,
    rightMaskWidth: 0,
    leftA: "none",//动画
    rightA: "none",
    leftSlidingRange: [],//左边滑动按钮范围
    rightSlidingRange: [],//右边滑动按钮范围
    checkedValue: [0]
  },
  created:function(){
    this.types = ['range', 'default'];
    this.modes = ['ratio', 'custom'];
    this.Dl = new Displacementer();
    this.Dr = new Displacementer();

    this.lineWidth = 0;
    this.isSlid = false;//是否可以滑动
    this.nowTouch = '';//当前点击的手柄
  },
  ready:function(){
    this.init()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initPart: function (nodeData,_value){
      let
        { value, mode, scale, type, minRange, valueKey } = this.data,
        leftIndex = 0,
        rightIndex = 0,
        newValue = initAryforJSON(_value || value, valueKey)
        ;
      // console.log(type, mode, minRange,"//////////////")

      this.lineWidth = nodeData.width - (type == "range" ? 30 : 0);//轨道长度
      this.unitLength = this.lineWidth / (mode == "ratio" ? 100 : scale.length - 1);//刻度距离（单位长度）
      this.minRangeWidth = this.unitLength * (type == "range" ? minRange : 0);//相距最小距离
      // console.log(this.lineWidth,this.unitLength,this.minRangeWidth,"//////////")
      //设置刻度尺
        this.scale = initAryforJSON(mode == "ratio" ? 101 : scale, valueKey, (newItem, index, len) => {
          if (newValue[0] && (newValue[0][valueKey] == newItem[valueKey])) { leftIndex = index }
          if (newValue[1] && (newValue[1][valueKey] == newItem[valueKey])) { rightIndex = len - index - 1 }
        });

      this.Dl.save(leftIndex * this.unitLength);
      this.Dr.save(-rightIndex * this.unitLength);
        let
          rangeStateObj = {
            leftMaskWidth: leftIndex * this.unitLength+"px",
            rightMaskWidth: rightIndex * this.unitLength + "px",
            checkedValue: [this.scale[leftIndex], this.scale[this.scale.length - rightIndex - 1]],
            leftSlidingRange: [0, this.lineWidth - this.minRangeWidth - rightIndex * this.unitLength],
            rightSlidingRange: [this.minRangeWidth - this.lineWidth + leftIndex * this.unitLength, 0],
          };
      
      this.setData(rangeStateObj)
    },
    init: function(_value) {
        if (this.nodeData){
          this.initPart(this.nodeData, _value)
        }else{
          wx.createSelectorQuery().in(this).select("#line").boundingClientRect((nodeData) => {
            nodeData && (this.nodeData = nodeData);
            this.initPart(nodeData, _value)
          }).exec();
        }
     
    },
    handleTouchstart: function(e) {
      let pt = e.currentTarget.dataset.name;
      // console.log("touch",e)
      if (e.touches.length == 1) {
        let
          self = this,
          touch = e.touches[0];
        this.isSlid = true;
        this.nowTouch = pt;
        switch (this.nowTouch) {
          case 'left': self.Dl.init(touch.clientX, touch.clientY); self.setData({ leftA: "none" }); break;
          case 'right': self.Dr.init(touch.clientX, touch.clientY); self.setData({ rightA: "none" }); break;
        }
      }
    },
    boxTouchmove: function(e) {
      if (this.isSlid && (e.touches.length == 1)) {

        let
          self = this,
          touch = e.touches[0],
          touchData = {},//计算后的touch对象
          moveX = ""//移动的绝对距离
          ;
        switch (this.nowTouch) {
          case 'left':
            touchData = self.Dl.getData(touch.clientX, touch.clientY);
            moveX = touchData.cacheMoveX + touchData.moveX;
            self.rangeSwitch(moveX, self.data.leftSlidingRange, {
              left: function (value) { self.isSlid = false },
              right: function (value) { self.isSlid = false },
              common: function (value) {
                self.setData({ leftMaskWidth: value + "px" });
              }
            });
            ; break;
          case 'right':
            touchData = self.Dr.getData(touch.clientX, touch.clientY);
            moveX = touchData.cacheMoveX + touchData.moveX;
            self.rangeSwitch(moveX, self.data.rightSlidingRange, {
              left: function (value) { self.isSlid = false },
              right: function (value) { self.isSlid = false },
              common: function (value) {
                self.setData({ rightMaskWidth: Math.abs(value) + "px" });
              }
            });
            ; break;
        }
      }
    },
    handleTouchend: function(e) {
      
      this.isSlid = false;
      let
        self = this,
        ratio = 0,
        valueKey = this.data.valueKey,
        { leftSlidingRange, rightSlidingRange, checkedValue, type} = this.data,
        _checkedValue = []
        ;
      let
        unitLength = this.unitLength,
        lineWidth = this.lineWidth
        ;
      switch (this.nowTouch) {
        case 'left':
          var moveX = self.Dl.cacheMoveX + self.Dl.moveX;
          moveX = moveX > leftSlidingRange[1] ? leftSlidingRange[1] : moveX;
          ratio = moveX % unitLength >= (unitLength / 2) ? Math.ceil(moveX / unitLength) : Math.floor(moveX / unitLength);//占比
          ratio = ratio < 0 ? 0 : ratio > (this.scale.length - 1) ? this.scale.length - 1 : ratio;
          var
            endMoveX = ratio * unitLength
            ;
          this.rangeSwitch(endMoveX, leftSlidingRange, {
            common: (value) => {
              _checkedValue = [this.scale[ratio], checkedValue[1] || this.scale.slice(-1)[0]];
              this.setData({
                checkedValue: _checkedValue,
                leftMaskWidth: value + "px", leftA: "all 0.2s ease-out",
                rightSlidingRange: [endMoveX - this.lineWidth + this.minRangeWidth, rightSlidingRange[1]]
              });
              this.Dl.save(value);
            }
          });
          break;
        case 'right':
          var moveX = Math.abs(this.Dr.cacheMoveX + this.Dr.moveX);
          moveX = moveX > Math.abs(rightSlidingRange[0]) ? Math.abs(rightSlidingRange[0]) : moveX;
          ratio = moveX % unitLength >= (unitLength / 2) ? Math.ceil(moveX / unitLength) : Math.floor(moveX / unitLength);//占比
          ratio = ratio < 0 ? 0 : ratio > (this.scale.length - 1) ? this.scale.length - 1 : ratio;
          var
            endMoveX = -ratio * unitLength
            ;
          ratio = this.scale.length - ratio - 1;
          this.rangeSwitch(endMoveX, rightSlidingRange, {
            common: (value) => {
              _checkedValue = [checkedValue[0] || this.scale[0], this.scale[ratio]];
              this.setData({
                checkedValue: _checkedValue,
                rightMaskWidth: Math.abs(value) + "px", rightA: "all 0.2s ease-out",
                leftSlidingRange: [leftSlidingRange[0], this.lineWidth + endMoveX - this.minRangeWidth]
              });
              this.Dr.save(value);
            }
          });
          break;
      }
      if (valueKey == "bst_value") {
        _checkedValue = _checkedValue.map((item) => item[valueKey])
      }
      this.triggerEvent("change", type == 'default' ? _checkedValue.slice(0,1) : _checkedValue);
      this.nowTouch = '';
    },
    rangeSwitch: function(value, rangeAry, boundary) {
      // console.log(value,rangeAry,"----------")
      if (value < rangeAry[0]) { 
        boundary.left && boundary.left.call(this, rangeAry[0]); 
        boundary.common && boundary.common.call(this, rangeAry[0]) 
        }
      if (value > rangeAry[1]) {
        boundary.right && boundary.right.call(this, rangeAry[1]);
        boundary.common && boundary.common.call(this, rangeAry[1]) 
        }
      if (value >= rangeAry[0] && value <= rangeAry[1]) { 
        boundary.center && boundary.center.call(this, value); 
        boundary.common && boundary.common.call(this, value) 
        }
    }
  }
})
