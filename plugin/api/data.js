
/*
      检测object是否含有某组属性，例如：
      var obj={name:"test",age:10};
      var one=hasKey(obj,["name","age"]),two=hasKey(obj,["name","age","ather"]);
      one//true;
      two//false
    */
function hasKey(obj, keyArray) {
  if (obj instanceof Object && keyArray instanceof Array) {
    var ble = false;
    for (var i = 0, n = keyArray.length; i < n; i++) {
      if (obj.hasOwnProperty(keyArray[i])) {
        ble = true;
      } else {
        ble = false;
        break
      }
    }
    return ble
  }
}
/**
 可跳出循环
 ary:[],//(array)需要遍历的数组
 fun:function(item,index,ary){},//(function)每次循环需要执行的函数；
      item：当前循环的数据
      index:当前索引
      ary：遍历的数组
      注：如果在fun内部return true将跳出本次循环
*/
function myFor(ary, fun) {
  for (var i = 0, n = ary.length; i < n; i++) {
    if (fun && (typeof fun == "function")) {
      var isBreak = fun(ary[i], i, ary);
      if (isBreak) { break }
    }
  }
}
/**
 下钻JSON数据：
    JSONary:[],//(JSONarray)需要下钻的数据
    drillKeyAry:["children"],//(array)下钻要寻找的key；越靠前优先级越高
    fun:function(item,childrenAry){},//(function)每次遍历要执行的回调
          item：当前遍历的对象
          children：当前对象的子集数据

 */
function drillJSON(JSONary, drillKeyAry, fun, parentItem) {
  var hasValueKey = function (obj, drillKeyAry) {
    var keyStr = "";
    myFor(drillKeyAry, function (key) {
      if (obj[key] && (obj[key] instanceof Array) && (obj[key].length > 0)) { keyStr = key; return true }
    });
    return keyStr
  };
  myFor(JSONary, function (itemObj) {
    var
      key = hasValueKey(itemObj, drillKeyAry),
      newItem = JSON.parse(JSON.stringify(itemObj))
      ;
    delete newItem[key];
    if (fun) {
      var isBreak = fun(newItem, itemObj[key], parentItem);
      if (isBreak) { return true }
    }
    // fun&&fun(newItem,itemObj[key]);
    if (key) {
      drillJSON(itemObj[key], drillKeyAry, fun, newItem)
    }

  })
}
//模式取值
function patternGetValue(obj, patternStr) {
  var
    value = obj,
    flag = true,
    keyAry = patternStr ? patternStr.split(/[\[\]\.]/g).filter(function (chuck) { return chuck }) : [];
  myFor(keyAry, function (key) {
    value = value[key];
    if (!value) {
      flag = false;
      console.error("get value key:" + key + " is " + value);
      return true
    }
  })
  return flag && patternStr ? value : ""
}
function duplicateRemoval(ary) {
  if (ary instanceof Array) {
    let
      temporaryStr = "key" + Number(Math.random() * 100000000000).toFixed(0),
      obj = {}, newAry = [];
    ary.forEach(function (item, index) {
      let _key = temporaryStr + item;
      if (!obj[_key]) {
        obj[_key] = true;
        newAry.push(item)
      }
    });
    obj = null;
    return newAry
  } else {
    throw new Error("去重参数不为数组！" + ary)
  }
}
class InitDateObj {
  static dateWeekAry = ["日", "一", "二", "三", "四", "五", "六"];
  static model = "YYYY-MM-DD hh:mm:ss";
  //填充站位对象以及取值对应方法
  static fillBitData = {
    Y: { name: "年", dc: 12, next: "M", getValueFunFromDate: "getFullYear" },
    M: { name: "月", dc: 30, next: "D", getValueFunFromDate: "getMonth" },
    D: { name: "天", dc: 24, next: "h", getValueFunFromDate: "getDate" },
    h: { name: "时", dc: 60, next: "m", getValueFunFromDate: "getHours" },
    m: { name: "分", dc: 60, next: "s", getValueFunFromDate: "getMinutes" },
    s: { name: "秒", dc: 1000, next: "ms", getValueFunFromDate: "getSeconds" }
  };
  static bitString = "YMDhms";
  static getDivision(newModel) {
    let
      model = newModel || InitDateObj.model,
      division = model,
      bitAry = []
      ;
    Object.keys(InitDateObj.fillBitData).forEach(function (bit) {
      let bitForModelIndex = model.indexOf(bit);
      if (bitForModelIndex != -1) {
        bitAry.push({ index: bitForModelIndex, bit: bit });
      }
      division = division.replace(new RegExp(bit + "+", "g"), "")
    });
    bitAry.sort(function (a, b) {
      return a.index - b.index
    });
    bitAry = bitAry.map(function (item) { return item.bit });
    division = duplicateRemoval(division.split(""));
    return { division: division, getValueSequence: bitAry }
  };
  static completionStr(str) { return ("" + str).length < 2 ? "0" + str : str };
  //初始化时间对象
  static initDate(date, model, D) {
    date = date || new Date();
    D = D || InitDateObj.getDivision(model);
    let dateObj = {};
    if (typeof date == "string") {
      let valueAry = date.replace(new RegExp("\\" + D.division.join("|"), "g"), D.division[0]).split(D.division[0]);
      D.getValueSequence.forEach(function (bit, index) {
        dateObj[bit] = Number(valueAry[index] || 0)
      })
    } else if (date instanceof Date) {
      D.getValueSequence.forEach(function (bit, index) {
        let funName = InitDateObj.fillBitData[bit].getValueFunFromDate;
        dateObj[bit] = bit == "M" ? (date[funName]() + 1) : date[funName]()
      })
    }
    D = null;
    return dateObj
  }
  //获取时间字符串
  static getDateString(date, model) {
    let
      thisModel = model || InitDateObj.model,
      obj = InitDateObj.initDate(date, model);
    Object.keys(obj).forEach(function (key) {
      thisModel = thisModel.replace(new RegExp(key + "+", "g"), InitDateObj.completionStr(obj[key]))
    });
    obj = null;
    return thisModel
  }
  //获取别称
  static getNickname(date, options, model) {
    let
      targetDay = InitDateObj.getDate(date, model),
      today = new Date(),
      todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
      dayDiff = Math.floor((targetDay - todayStart) / InitDateObj.getProduct("D")),
      name = "";
    switch (dayDiff) {
      case 0: name = "今天"; break;
      case 1: name = "明天"; break;
      default: name = "周" + InitDateObj.dateWeekAry[(targetDay.getDay()) % 7]
    }
    return name
  }
  //获取时间对象
  static getDate(date, model) {
    let dateObj = InitDateObj.initDate(date, model);
    return new Date(dateObj.Y || 0, dateObj.M - 1 || 0, dateObj.D || 0, dateObj.h || 0, dateObj.m || 0, dateObj.s || 0)
  }
  //获取进制常量乘积
  static getProduct(bit) {
    let c = 1, targetObj = InitDateObj.fillBitData, item = targetObj[bit];
    while (item) {
      c = c * item.dc;
      item = targetObj[item.next]
    }
    targetObj = null; item = null;
    return c
  }
  //递归获取时间差值
  static cTotal(timeStamp, bit, targetObj, minC, level, config) {
    level = level || 0;
    config = config || {};
    level++;
    let
      item = targetObj[bit],
      ditem = targetObj[bit]
      ;
    if (!item) { return "0" }
    let c = InitDateObj.getProduct(bit);
    if (c > timeStamp && level == 1) {
      return InitDateObj.cTotal(timeStamp, ditem.next, targetObj, minC, 0)
    }
    let
      integer = config[bit] ? config[bit].split("{num}", Math.floor(timeStamp / c)) : Math.floor(timeStamp / c),
      remainder = timeStamp % c;
    return integer + ditem.name + (bit != minC ? InitDateObj.cTotal(remainder, ditem.next, targetObj, minC, level, config) : "")
  }
  //获取时间差值字符串
  static getDateDiffStr(start, end, maxC, minC, config) {
    maxC = maxC || "Y";
    minC = minC || "s";
    let diff = InitDateObj.getDate(end) - InitDateObj.getDate(start);
    return InitDateObj.cTotal(diff, maxC, InitDateObj.fillBitData, minC, 0, config)
  }
  //倒计时
  static countDown() {
    let date = arguments[0], config = {}, fun, isCDAok = true, timeID, nowTime = new Date();
    switch (arguments.length) {
      case 1:
        let a = arguments[0];
        if (hasKey(a, ["timer", "date"]) && typeof a.timer == "function") {
          date = a.date; fun = a.timer; config = a;
          nowTime = a.nowTime
        } else { isCDAok = false }
        break;
      case 2:
        if (typeof arguments[1] == "function") {
          fun = arguments[1]
        } else { isCDAok = false }
        break;
      case 3:
        if (typeof arguments[2] == "function" && arguments[1] instanceof Object) {
          fun = arguments[2]
        } else { isCDAok = false }
        break;
    }
    if (!isCDAok) {
      throw new Error("countDown 传参有误！");
    }
    let _timer = function () {
      timeID = setTimeout(function () {
        nowTime=new Date();
        let
          str = InitDateObj.getDateDiffStr(nowTime, date, config.maxC, config.minC, config),
          isContinue = fun.call(InitDateObj, str);
        ;
        // console.log(str,"///")
        str != "0" && !isContinue && _timer();

      }, config.interval || 1000)
    };
    _timer()
  }
  //是否闰年
  static isLeapYear(year) { return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0); }
  //检测是否大小月输出天数
  static getMonthDayNum(year, month) {
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) != -1) {
      return 31
    }
    if ([4, 6, 9, 11].indexOf(month) != -1) {
      return 30
    }
    if (month == 2) {
      if (InitDateObj.isLeapYear(Number(year))) {
        return 29
      } else {
        return 28
      }
    }
  }
}
function formatCss(css, filterRex) {
  if (!css) {
    // console.log("format css parameter error!:"+css);
    return {}
  }
  let styleObj = {}, cA;
  if (typeof css == "string") {
    cA = css.split(";").filter(function (f) {
      return /^\S+:/.test(f)
    });
  } else {
    cA = [];
    Object.keys(css).forEach(function (key) {
      if (key != "") {
        cA.push(key.replace(/\s+/g, "") + ":" + css[key])
      }
    })
  }
  cA.forEach(function (f) {
    let fAry = f.split(":"), key = fAry[0].replace(/\s+/g, "").split("-").map(function (keyF, i) {
      let kff = keyF;
      if (i != 0) {
        kff = keyF.slice(0, 1).toUpperCase() + keyF.slice(1)
      }
      return kff
    }).join("");
    if (!(filterRex && filterRex.test(key))){
      styleObj[key] = fAry[1]
    }
    
  });
  return styleObj
}
function mergeCssStr() {
  return formatCss(Object.assign.apply({}, [].map.call(arguments, function (cssstr) {
    let obj = {};
    if (typeof cssstr == "string") {
      (cssstr || '').split(";").forEach(function (f) {
        if (/^\S+:/.test(f)) {
          let fa = f.split(":");
          obj[fa[0]] = fa[1]
        }
      });
    } else {
      obj = cssstr || {}
    }
    return obj
  })))
}
function cssObjToString(cssObj){
  return Object.keys(cssObj).map((key)=>{
    let cutIndex=0,
        chunks=[]
    ;
    key.split("").forEach((letter,i,ary)=>{
      if (!(letter<"A"||letter>"Z")){
        chunks.push(key.substring(cutIndex, i).toLowerCase());
        cutIndex=i;
      }
      if (i == (ary.length - 1)){
        chunks.push(key.slice(cutIndex).toLowerCase());
      }
    });
    return chunks.join("-") + ":" + cssObj[key]
  }).join(";")
}
/*坐标创建换算类 */
class Displacementer {
  constructor(cacheMoveX, cacheMoveY) {
    this.beforX = 0;
    this.beforY = 0;
    this.moveX = 0;
    this.moveY = 0;
    this.distance = 0;
    this.moveDirection = '';
    this.isTap = false;
    this.cacheMoveX = cacheMoveX || 0;
    this.cacheMoveY = cacheMoveY || 0;
    this.frozen = { x: 0, y: 0 }
  }
  init(x, y) {
    this.beforX = Number(x);
    this.beforY = Number(y);
    this.moveX = 0;
    this.moveY = 0;
    this.distance = 0;
    this.moveDirection = '';
    this.isTap = false;
  }
  frozenXY(xORy) { this.frozen[xORy.toLowerCase()] = this["move" + xORy.toUpperCase()] }//冻结moveX/moveY
  thawXY(xORy) { this.frozen[xORy.toLowerCase()] = "" }//解冻moveX/moveY
  getData(x, y) {
    let moveX = this.frozen.x || (Number(x) - this.beforX),
      moveY = this.frozen.y || (Number(y) - this.beforY),
      moveObj = { x: 0, y: 0 }
      ;

    if (!this.isTap) {
      if (Math.abs(moveX) >= Math.abs(moveY)) {
        if (moveX > 0) {
          this.moveDirection = "right"
        } else {
          this.moveDirection = "left"
        }
        moveObj.x = moveX
      } else {
        if (moveY > 0) {
          this.moveDirection = "bottom"
        } else {
          this.moveDirection = "top"
        }
        moveObj.y = moveY
      }
      this.isTap = true
    }
    this.distance = Math.sqrt(Math.pow(this.moveX, 2) + Math.pow(this.moveY, 2));
    this.moveX = moveX;
    this.moveY = moveY;
    this.directionData = moveObj;
    return {
      moveX: moveX,
      moveY: moveY,
      distance: this.distance,
      moveDirection: this.moveDirection,
      directionData: moveObj,
      cacheMoveX: this.cacheMoveX,
      cacheMoveY: this.cacheMoveY,
    }
  }
  save(x, y) {
    this.cacheMoveX = x != 'undefined' ? x : (this.cacheMoveX + this.moveX);
    this.cacheMoveY = y != 'undefined' ? y : (this.cacheMoveY + this.moveY);
    if (this.xRange){
      if (this.cacheMoveX < this.xRange[0]) { this.cacheMoveX = this.xRange[0]};
      if (this.cacheMoveX > this.xRange[1]) { this.cacheMoveX = this.xRange[1]}
    }
    if (this.yRange) {
      if (this.cacheMoveY < this.yRange[0]) { this.cacheMoveY = this.yRange[0] };
      if (this.cacheMoveY > this.yRange[1]) { this.cacheMoveY = this.yRange[1] }
    }
    this.moveX = 0;
    this.moveY = 0;
    return {
      cacheMoveX: this.cacheMoveX,
      cacheMoveY: this.cacheMoveY,
    }
  }
  setRange(xAry,yAry){
    if (xAry && xAry instanceof Array && xAry.length == 2 && typeof xAry[0] == "number" && typeof xAry[1] == "number"){
      this.xRange = xAry
    }
    if (yAry && yAry instanceof Array && yAry.length == 2 && typeof yAry[0] == "number" && typeof yAry[1] == "number") {
      this.yRange = yAry
    }
  }
}
//初始数组为JSON数组
function initAryforJSON(list, valueKey, fun) {
  let Receptor;
  if (list instanceof Array) {
    return list.map((item, index, ary) => {
      let newItem = {};
      if (typeof item != "object" || !item) {
        newItem[valueKey] = item
      } else if (item.hasOwnProperty(valueKey)) {
        newItem[valueKey] = "your scale incomplete inclusion valueKey:" + valueKey + " !";
        newItem = Object.assign(newItem, item)
      }
      fun && (Receptor=fun(newItem, index, ary.length));
      return Receptor||newItem
    })
  } else if (typeof list == "number") {
    let ary = [];
    for (let i = 0; i < list; i++) {
      let item = { [valueKey]: i };
      fun && (Receptor = fun(item, i, list));
      ary.push(Receptor||item);
    }
    return ary
  }
}
module.exports = {
  InitDateObj,
  patternGetValue,
  drillJSON,
  myFor,
  duplicateRemoval,
  hasKey,
  formatCss,
  cssObjToString,
  mergeCssStr,
  Displacementer,
  initAryforJSON
}