// common/components/addressSelector/addressSelector.js
import { drillJSON } from "../../api/data.js";

var classAndStyleSet = require("../../behaviors/class_style_set.js")

//平面数据的搜索规则
function hasSearchStr_p(keyAry,obj,searchStr){
    var 
    flog=false,rgx=new RegExp("^"+searchStr);

    for(var i=0,n=keyAry.length;i<n;i++){
      var 
      value = obj[keyAry[i]]||"";
      //如果遍历的KEY值是汉字
      if (/^[\u4e00-\u9fa5]+$/.test(value)){
        if (value.indexOf(searchStr) != -1) {
          flog = true; break;
        }
      }else{//如果是非汉字
        if (rgx.test(value)){
          flog = true; break;
        }
      }
      
    }
    return flog
}
//判断可选属性里面哪个有值（越靠前优先级越高）
function myFor(ary, fun) {
  for (var i = 0, n = ary.length; i < n; i++) {
    if (fun && (typeof fun == "function")) {
      var isBreak = fun(ary[i], i, ary);
      if (isBreak) { break }
    }
  }
}
var hasValueKey = function (obj, drillKeyAry) {
  var keyStr = "";
  myFor(drillKeyAry, function (key) {
    if (obj[key] && (obj[key] instanceof Array) && (obj[key].length > 0)) { keyStr = key; return true }
  });
  return keyStr
};
//设置历史记录栈缓存
function setHistoryStorge(key,data){
  var 
  old = wx.getStorageSync(key)||[];
  for (var i = 0, n = old.length;i<n;i++){
    if (("_" + old[i].fullName + "_" + old[i].alias + "_") == ("_" + data.fullName + "_" + data.alias + "_" )) {
      old.splice(i, 1); break;
    }
  };
  old.splice(0, 0, data);
  old=old.slice(0,6);
  wx.setStorageSync(key, old)
}
//获取文字母
function getLetter(){
  var A_Z = [];
  for (var i = 65; i < 91; i++) {
    A_Z.push(String.fromCharCode(i));
  }
  return A_Z
}

Component({
  behaviors: [classAndStyleSet],
  /**
   * 组件的属性列表
   */
  properties: {
    //下钻key集合
    drillKey:{type:Array,value:[]},
    //所有立体数据
    solidAllData: { type: Array, value: [], observer:function(value){
        var planeAllData=[];
        drillJSON(value, this.data.drillKey,function(item){
          planeAllData.push(item)
        });
        this.setData({ planeAllData: planeAllData })
        var self=this;
        setTimeout(function(){
          self.setData({ searchData_p: self.planeSearchIng("a",0) });
        },0)
    }},
    //缓存历史的键
    historyKey: { type: String, value: "_historyKey", observer:function(val){
        this.setData({
          historyData: wx.getStorageSync(val) || [],
        })
    }},
    //热门城市数据
    hotData: { type: Array, value:[]},
    //当前定位数据
    currentData: { type: Object, value: {} },
    //需要搜索的属性值集合
    searchKey: { type: Array, value: []},
    labelKey:{type:String,value:"label"},
    placeholder: { type: String, value:""},
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    checkedListIsHide: false,
    searchListIsHide:true,
    checkedListboxScrollTop:"0",
    scrollID:"",
    //所有平面的数据
    planeAllData:[],
    //模拟键盘点击后产生的数据
    checkedSearchData: [],
    //input搜索数据
    searchData_s:[],
    //平面搜索产生的数据
    searchData_p:[] ,
    //历史数据
    historyData: [],
    //上一次点击键盘的index
    prevClickKeyIndex:"0",
    //键盘初始化数据
    keyboardData: getLetter().map(function (str, index) { return { key: str, className: index == 0 ?"key-checked":"", i: index}}),
  },
  attached:function(){
    this.setData({
      historyData: wx.getStorageSync(this.data.historyKey)||[],
    })
    console.log(this.data.currentData,"currentData")
    // setTimeout(function(){
    //   self.setData({ searchData: self.searchIng("a")})
    // },500)
  },
  /**
   * 组件的方法列表
   */
  methods: {
      //输入框输入内容时回调
      onInput:function(e){
        var 
          value = e.detail.value.replace(/\s+/g, "").toLowerCase(),
            s,c
        ;
        if (value.length>0){
          s = false;
          c = true;
          this.solidSearchIng(value)
          // this.setData({ searchData: this.searchIng(value)})
        }else{
          s = true;
          c = false;
        }
        this.setData({
          checkedListIsHide: c,
          searchListIsHide: s,
        })
      },
      //定位城市点击回调
      onPointCityClick: function (e) {//addressNo
        var currentData = this.data.currentData;
        if (currentData.addressNo){
          this.triggerEvent("pointClick", this.data.currentData);
        }
      },
      //地址点击回调
      onAddressClick:function(e){
        var 
          eventData = e.currentTarget.dataset,
          addressObj = eventData.address;
          this.triggerEvent("change", addressObj);
          setHistoryStorge(this.data.historyKey, addressObj);
      },
      //点击模拟键盘回调
      onKeyboardClick:function(e){
        var self=this;
        var
          eventData = e.currentTarget.dataset,
          key = eventData.key.key.toLowerCase(),
          index = eventData.key.i
          ;
          this.planeSearchIng(key,index)
          //此处有坑
          self.setData({ scrollID:"keyboard"})
      },
      //搜索立体数据
      solidSearchIng:function(str){
        
        var
          labelKey = this.data.labelKey,
          all = this.data.solidAllData,
          searchKeyAry = this.data.searchKey,
          drillKey = this.data.drillKey,
          isOKdataAry = [];
          for (var i = 0, n = all.length; i < n; i++) {
            var 
                item = JSON.parse(JSON.stringify(all[i])),
                key = hasValueKey(item, drillKey),
                collectDataAry=[]//收集的数据
                ;
            if (hasSearchStr_p(searchKeyAry, item, str)) {
              if (key){
                collectDataAry=JSON.parse(JSON.stringify(item[key]));
                myFor(collectDataAry,function(children){
                  children[labelKey] = item[labelKey] + "-" + children[labelKey]
                })
                delete item[key]
              }//splice
              item.className = "address-search-city"
              collectDataAry.splice(0, 0, item);
              isOKdataAry = isOKdataAry.concat(collectDataAry)
            }else{
              if(key){
                var flog = false, newItemAry = JSON.parse(JSON.stringify(item[key]));
                for (var c = 0, cn = newItemAry.length;c<cn;c++){
                  if (hasSearchStr_p(searchKeyAry, newItemAry[c], str)){
                    newItemAry[c][labelKey] = item[labelKey] + "-" + newItemAry[c][labelKey];
                    collectDataAry.push(newItemAry[c]);flog=true;
                  }
                };
                if(flog){
                  delete item[key];
                  item.className="address-search-city"
                  collectDataAry.splice(0, 0, item);
                  isOKdataAry = isOKdataAry.concat(collectDataAry)
                }
              }
            }
          }
          // console.log(isOKdataAry,"|inputSearchAry")
          this.setData({
            searchData_s: isOKdataAry
          })
      },
      //搜索平面数据
      planeSearchIng:function(str,index){
        this.data.keyboardData[this.data.prevClickKeyIndex].className = ""
        this.data.keyboardData[index].className = "key-checked"
        this.data.prevClickKeyIndex = index;
        var 
            all = this.data.planeAllData,
            searchKeyAry = this.data.searchKey,
            isOKdataAry=[]
            ;
        for(var i=0,n=all.length;i<n;i++){
            var item=all[i];
            if (hasSearchStr_p(searchKeyAry, item, str)){
              isOKdataAry.push(item)
            }
        }
        this.setData({
          keyboardData: this.data.keyboardData,
          searchData_p: isOKdataAry
        })
        return isOKdataAry
      }
  }
})
