// plugin/components/calendar/calendar.js
import { formatCss, InitDateObj, initAryforJSON, myFor, cssObjToString } from '../../api/data.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: { type: String, value: "point"},//range、moreRange
    title: { type: Array, value: ["日", "一", "二", "三", "四", "五", "六"] },
    value: { type: Array, value: [], observer: function (val,old) {
      if(val&&old&&(JSON.stringify(val)!=JSON.stringify(old))){
        setTimeout(() => { this.initData(val) })
      }
    }},
    nowDate: { type: String, value: "" },//当前时间
    monthShowDate: {type: String, value: "", observer: function (val, old) {
        if (val && old && (val!= old)) {
          setTimeout(() => { this.initData() })
        }
      }},//显示第一个月月份时间
    monthShowNum: {type: Number, value: 1, observer: function (val, old) {
        if (val && old && (val != old)) {
          setTimeout(() => { this.initData() })
        }
      }},//显示多少个月
    markerData: {type: Object, value: {}, observer: function (val, old) {
        if (val && old && (JSON.stringify(val) != JSON.stringify(old))) {
          setTimeout(() => { this.initData() })
        }
      }},//特殊日期数据
    boxStyle: { type: String, value: "" },
    titleStyle: { type: String, value: "" },
    todayStyle: { type: String, value: "" },//今天的样式
    checkedStyle: { type: String, value: "" },//选中的样式
    checkedFGStyle: { type: String, value: "" },//选中的前景样式
    rangeStyle: { type: String, value: "" },//范围样式
    monthTitleStyle: { type: String, value: "" },//月份标题样式

  },

  /**
   * 组件的初始数据
   */
  data: {
    dateAry: [],//渲染的最终数据
    injectionMethods: ["blackout"],//允许注入的方法
    dayHheight:"46px"
  },
  created:function(){
    this.checkedDate = [];//最终选择值
  },
  attached:function(){
    this.initData();
    this.triggerEvent("examplePipe", { setMethod: this.setMethod.bind(this)})
  },
  ready:function(){
      wx.createSelectorQuery().in(this).select("#dateBox").boundingClientRect((rect)=>{
        this.setData({ dayHheight: rect.width/7+"px"})
        console.log(rect.width / 7,"////////////////////")
      }).exec()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //初始化
    initData: function(checkedDate) {
      let 
        { type, value, checkedStyle, rangeStyle, checkedFGStyle} = this.data;
        //过滤影响高宽的属性
      checkedFGStyle = cssObjToString(formatCss(checkedFGStyle, /(^width)|(^height)|(^padding\S*)|(^margin\S*)/));
      this.checkedDate = checkedDate || value || [];
      this.initDateAry.call(this, (day) => {
        switch (type) {
          case "point":
            this.checkedDate.forEach((checkedStr) => {
              if (checkedStr == day.dateString) { 
                day.className += " date-checked" ;
                day.isChecked = true;
                day.style = checkedStyle;
                day.checkedFGStyle = checkedFGStyle
              } else {
                day.className = day.className.trim().replace("date-checked", "")
              }
            }); break;
          case "range":
            day.className = day.className.trim().replace(/(date-checked)|(date-range)|(date-checked-left)|(date-checked-right)/g, "").trim();
            this.checkedDate.forEach((checkedStr, ci, cAry) => {
              if (checkedStr == day.dateString) {
                if (cAry.length > 1) {
                  day.className += ci == 0 ? " date-checked-left" : " date-checked-right"
                } else {
                  day.className += " date-checked"
                }
                day.isChecked=true;
                day.style = checkedStyle;
                day.checkedFGStyle = checkedFGStyle
              }
              if (cAry.length == 2 && day.timeStamp > InitDateObj.getDate(cAry[0]) && day.timeStamp < InitDateObj.getDate(cAry[1])) {
                day.className += " date-range";
                day.isChecked = true;
                day.style = rangeStyle;
              }
            })
              ; break;
          case "moreRange": break;
        }
        return day
      });
    },
  //初始化日期数组
    initDateAry: function(fun) {
      let
        { monthShowNum, monthShowDate } = this.data,
        firstDateObj = InitDateObj.initDate(monthShowDate, "YYYY-MM-DD"),
        dateAry = [];
      for (let m = 0; m < monthShowNum; m++) {
        let
          y = firstDateObj.Y + Math.floor((firstDateObj.M - 1 + m) / 12),
          mi = (firstDateObj.M - 1 + m) % 12;
        let monthData = this.drawMonth.call(this, y, mi, m, fun);
        dateAry.push(monthData)
      }
      this.setData({ dateAry: dateAry })
    },
  //绘制月
    drawMonth: function(year, monthIndex, mi, fun) {
      let
        blackout = this.blackout,
        { nowDate, markerData, checked, todayStyle } = this.data,
        nowDateStr = InitDateObj.getDateString(nowDate, "YYYY-MM-DD"),
        // tomorrowStr = InitDateObj.getDateString(new Date(new Date().getTime()+24*60*60*1000),"YYYY-MM-DD"),
        monthFirstDayWeekIndex = new Date(year, monthIndex, 1).getDay(),
        monthObj = {
          vacancy: monthFirstDayWeekIndex,//前面空位
          value: year + "年" + (monthIndex + 1) + "月",
          day: []
        },
        dayNum = InitDateObj.getMonthDayNum(year, monthIndex + 1) + 1;
      // console.log(blackout.call(null,1),"blackout")
      //循环天
      for (let d = 1; d < dayNum; d++) {
        let
          date = new Date(year, monthIndex, d, 0, 0, 0),
          dateStr = year + "-" + InitDateObj.completionStr(monthIndex + 1) + "-" + InitDateObj.completionStr(d),
          classStr = "",
          dayOptions = {
            dateString: dateStr,
            value: d,
            marker: {},
            className: "",
            timeStamp: date.getTime(),
            style:"",
            checkedFGStyle:"",
            isChecked:false
          }
          ;
        switch (dateStr) {
          case nowDateStr:
            classStr += "date-today";
            dayOptions.value = "今天";
            dayOptions.style = todayStyle;
            break;
          // case tomorrowStr:
          //   dayOptions.value="明天";
          //   break;
        };
        if (markerData[dateStr]) {
          dayOptions.marker = markerData[dateStr];
          dayOptions.style = markerData[dateStr].style||''
          classStr += " date-marker"
        }
        if (blackout && !blackout(dayOptions)) {
          classStr += " date-disable"
        }
        dayOptions.className = classStr;
        fun && (dayOptions = fun(dayOptions));
        monthObj.day.push(dayOptions)
      }

      return monthObj
    },
  //天点击回调
    dayClickFun: function(e) {
      // day, month, level
      let
        { day, month, level } = e.currentTarget.dataset,
        dayOptins = JSON.parse(JSON.stringify(day)),
        { type } = this.data
        ;
      if (dayOptins.className.indexOf("date-disable") != -1) {
        return false
      }
      switch (type) {
        case "point":
          (this.checkedDate.length >= 1) && (this.checkedDate = []);
          this.checkedDate = this.checkedPipe(this.checkedDate, day.dateString);
          this.initData.call(this, this.checkedDate);
            (this.checkedDate.length == 1) && this.triggerEvent("change", this.checkedDate)
            ; break;
            
        case "range":
          (this.checkedDate.length >= 2) && (this.checkedDate = []);
          this.checkedDate = this.checkedPipe(this.checkedDate, day.dateString);
          this.initData.call(this, this.checkedDate);
          (this.checkedDate.length == 1) && this.triggerEvent("checkStart", this.checkedDate);
          (this.checkedDate.length == 2) && this.triggerEvent("change", this.checkedDate)
            ; break;
        case "moreRange":
          this.checkedDate = this.checkedPipe(this.checkedDate, day.dateString);
          this.initData.call(this, this.checkedDate);
          this.triggerEvent("change", this.checkedDate)
            ; break;
      }


    },
    checkedPipe: function(ary, item) {
      let
        myary = JSON.parse(JSON.stringify(ary)),
        index = myary.indexOf(item);
      if (index != -1) {
        myary.splice(index, 1)
      } else {
        myary.push(item)
      }
      myary.sort((a, b) => InitDateObj.getDate(a, "YYYY-MM-DD") - InitDateObj.getDate(b, "YYYY-MM-DD"));


      return myary
    },
    setMethod:function(name,fun){
      if((this.data.injectionMethods.indexOf("blackout") != -1)&&fun){
        this[name] = fun;
        this.initData()
      }
    }
  }
})
