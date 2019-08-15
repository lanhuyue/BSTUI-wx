// common/components/dateLine/dateLine.js
//引入公用部分
var classAndStyleSet = require("../../behaviors/class_style_set.js")

var dateWeekAry = ["日", "一", "二", "三", "四", "五", "六",];
var completionStr = function (str) { return ("" + str).length < 2 ? "0" + str : str }
var getDatStr = function (date) { return date.getFullYear() + "-" + completionStr(date.getMonth() + 1) + "-" + completionStr(date.getDate()) }
var getDatChineseStr = function (date) { 
  var today =getDatStr(new Date()),
      tomorrow = getDatStr(new Date(new Date().getTime()+24*60*60*1000)),
      week=""
      ;
      switch (getDatStr(date)){
        case today: week="今天";break;
        case tomorrow: week="明天";break;
      }
      var str = completionStr(date.getMonth() + 1) + "月" + completionStr(date.getDate()) + "日 " + (week || ("周" +dateWeekAry[date.getDay()]))
  return str
  };
var nowStr = getDatStr(new Date());

Component({
  behaviors: [classAndStyleSet],
  /**
   * 组件的属性列表
   */
  properties: {
    date: {type: String, value: "", observer :function(val){
      var 
      nowStr = getDatStr(new Date()),
      endStr = getDatStr(new Date(new Date().getTime() + (this.data.preSellDays-1)*24*60*60*1000));
      this.setData({ 
        nowDateObj:new Date(val),
        cDate: getDatChineseStr(new Date(val)),
        pClassName: nowStr==val? "date-line-disable-p":"",
        nClassName: endStr == val ? "date-line-disable-n" : ""
        })
    }},
    preSellDays: {type: Number, value: 7, observer: function (val) {
        this.setData({
          preSellDateObj: new Date(new Date().getTime() + val* 24 * 60 * 60 * 1000)
        })
    }}
  },

  /**
   * 组件的初始数据
   */
  data: {
    nowDateObj:new Date(),
    cDate:"",
    preSellDateObj: new Date(new Date().getTime()+7*24*60*60*1000),
    pClassName:"date-line-disable-p",
    nClassName:"",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击上一天
    onPrevClick:function(e){
      var 
      date=new Date(this.data.nowDateObj.getTime()-24*60*60*1000),
      dateStr = getDatStr(date),
      cdateStr = getDatChineseStr(date)
      if (date.getTime() < (new Date().getTime() - 24 * 60 * 60 * 1000)){
          this.setData({
            pClassName:"date-line-disable-p",
          })
          return false
      }
      ;
      this.setData({
        pClassName: "",
        nClassName: "",
        date: dateStr,
        cDate: cdateStr,
        nowDateObj: date
      })
      this.triggerEvent("change", { date: this.data.date, preSellDays: this.data.preSellDays})
    },
    //点击下一天
    onNextClick:function(e){
      var
        date = new Date(this.data.nowDateObj.getTime() + 24 * 60 * 60 * 1000),
        dateStr = getDatStr(date),
        cdateStr = getDatChineseStr(date)
        ;

      if (date.getTime() > (this.data.preSellDateObj.getTime() - 24 * 60 * 60 * 1000)) {
        this.setData({
          nClassName: "date-line-disable-n"
        })
        return false
      }
      this.setData({
        pClassName: "",
        nClassName: "",
        date: dateStr,
        cDate: cdateStr,
        nowDateObj: date
      })
      this.triggerEvent("change", { date: this.data.date, preSellDays: this.data.preSellDays })
    },
    //点击时间选择回调
    onCheckDate:function(e){
      this.triggerEvent("check", { date: this.data.date  ,preSellDays: this.data.preSellDays})
      
    },
  }
})
