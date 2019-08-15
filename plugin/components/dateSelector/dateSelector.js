// plugin/components/dateSelector/dateSelector.js
import { InitDateObj,formatCss, cssObjToString, mergeCssStr, } from '../../api/data.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{type:Boolean,value:false},
    value: {
      type: Array, value: [], observer: function (val) {
        this.setData({ checkedDate:val})
      }},
    title: {
      type: String, value: "", observer: function (val) {
        if(val=='auto'){this.setData({
          title:"请选择日期",
          isAutoTile:true,
          titleStyle: cssObjToString( mergeCssStr("font-weight: normal;font-size: 28rpx",this.data.titleStyle))
          })}
      }},
    type: { type: String, value: "point"},
    float: { type: String, value:"bottom"},
    markerData: { type: Object, value: {} },//特殊日期数据
    monthShowDate: { type: String, value: "" },//显示第一个月月份时间
    monthShowNum: { type: Number, value: 1 },//显示多少个月
    bodyStyle: { type: String, value:""},
    titleStyle: { type: String, value:""},
    dateTitleStyle: { type: String, value:""},
    checkedStyle: { type: String, value: "" },//选中的样式
    checkedFGStyle: { type: String, value: "" },//选中的前景样式
    rangeStyle: { type: String, value: "" },//范围样式
    monthTitleStyle: { type: String, value: "" },//月份标题样式
    hasMore: { type: Boolean, value: false },//是否开启更多按钮
    leftButtonStyle: { type: String, value: ""},//左边（more/取消）按钮样式
    sureStyle: { type: String, value: ""},//确定按钮样式
    todayStyle: { type: String, value: "" },//今天的样式
  },

  /**
   * 组件的初始数据
   */
  data: {
    disabledSure:false,
    checkedDate:[],
    moreAnimation:{},
    isAutoTile:false,
    // type:"dsada"
  },
  created:function(){
    //初始化动画实例
    var op = {
      duration: 200,
      timingFunction: "ease-out"
    }
    this.am = wx.createAnimation(op);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onMoreButtonClick:function(e){
      let 
      clickName = e.target.dataset.name,
        monthShowDate = InitDateObj.getDate(this.data.monthShowDate,"YYYY-MM-DD"),
        dateObj = InitDateObj.initDate(monthShowDate, "YYYY-MM-DD"),
        timeStamp = monthShowDate.getTime(),
        mdNum = InitDateObj.getMonthDayNum(dateObj.Y, dateObj.M),
        mdStr = "-" + InitDateObj.completionStr(dateObj.M) + "-" + InitDateObj.completionStr(dateObj.D)
      ;
      switch(clickName){
        case "-m": timeStamp -= 1000 * 60 * 60 * 24 * (dateObj.D+1); break;
        case "+m": timeStamp += 1000 * 60 * 60 * 24 * (mdNum - dateObj.D + 1);  break;
        case "-y": timeStamp = Number(dateObj.Y) - 1 + mdStr;break;
        case "+y": timeStamp = Number(dateObj.Y) + 1 + mdStr;break;
      }
      let dateStr = typeof timeStamp == "string" ? timeStamp : InitDateObj.getDateString(new Date(timeStamp),"YYYY-MM-DD");
      this.setData({
        monthShowDate: dateStr
      })
    },
    //日历组件值改变时触发
    onDateChange:function(e){
      let 
        {isAutoTile}=this.data,
      setOptions={
        disabledSure: false,
        checkedDate: e.detail
      };
      isAutoTile && (setOptions.title = e.detail.join('/'))
      this.setData(setOptions)
    },
    //组件被点击时显示隐藏组件
    onDateClick:function(){
      this.setData({ show: !this.data.show})
    },
    //组件隐藏时触发
    onhide:function(){
      this.setData({ show: false });
      this.triggerEvent("hide");
      this.hideMoreView()
    },
    //点击more（更多）时触发
    onMoreClick:function(){
      let { hasMore }=this.data;
      if(hasMore===true){
        this.setData({
          moreAnimation: this.am.translateX("0").step().export()
        })
      }else{
        this.onhide()
      }
    },
    //点击确定时触发
    onsure:function(){
      
      this.triggerEvent("change", this.data.checkedDate)
      this.onhide()
    },
    //选择开始日期时候的回调（当datetype为range时生效）
    onCheckStartDate:function(e){
      this.setData({ disabledSure:true})
    },
    //（底层日历实例）实例传输管道
    onexamplePipe:function(e){
      this.triggerEvent("examplePipe", { setMethod: e.detail.setMethod })
    },
    //隐藏更多操作栏
    hideMoreView:function(){
      this.setData({
        moreAnimation: this.am.translateX("-120%").step().export()
      })
    }
  }
})
