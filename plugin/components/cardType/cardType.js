// common/components/cardType/cardtype.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    zone: { type: String, value: "all", observer:function(value){
      this.initShowLsit(this.data.list, value)
    }},
    checkedItemCode: { type: String, value: "01", observer:function(val){
      this.initChecked(val)
    }},
    showList:{type:Array,value:[]},
    //证件类型
    list:{
      type:Array,
      value: [
        { code: "01", label: "身份证", regexp:"(^\\d{15}$)|(^\\d{17}([0-9]|X|x)$)",tips:"身份证填写有误！"},
        {code: "02", label: "护照", regexp: "^\\S{4,20}$", tips: "护照长度限4-20个字以内！"},
        { code: "03", label: "台胞证", regexp: "^\\S{1,30}$", tips: "台胞证长度限1-30个字以内！"},
        { code: "04", label: "港澳通行证", regexp: "^\\S{1,30}$", tips: "港澳通行证长度限1-30个字以内！"},
        { code: "05", label: "学生证", regexp: "^\\S{2,30}$", tips: "学生证填写有误！"},
        { code: "06", label: "军人证", regexp: "^\\S{2,30}$", tips: "军人证填写有误！"},
        { code: "07", label: "军残证", regexp: "^\\S{2,30}$", tips: "军残证填写有误！" },
        { code: "99", label: "其他"}
      ],
      observer:function(value){
        this.initShowLsit(value, this.data.zone)
      }
      } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    //当前验证类型
    testRegexpStr:"",
    testTips:"",
  },
  attached:function(){
    this.initChecked(this.data.checkedItemCode||"01")
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initShowLsit:function(allList,zone){
      var
        showList = [],
        zone = this.data.zone
        ;
      if (zone == "all") {
        showList = allList
      } else {
        allList.forEach(function (item) {
          if (zone.indexOf(item.code) != -1) {
            showList.push(item)
          }
        })
      }
      this.setData({ showList: showList })
    },
    initChecked:function(code){
      var ary = this.data.showList;
      console.log(ary,code)
        for(var i=0,n=ary.length;i<n;i++){
          if (code==ary[i].code){
            this.data.testRegexpStr = ary[i].regexp||"";
            this.data.testTips = ary[i].tips||"";
            break;
            }
        }
    },
    onListItemClick:function(e){
      var item = e.currentTarget.dataset.item;
      this.triggerEvent("change", item);
      item.regexp&&(this.data.testRegexpStr = item.regexp);
      item.tips && (this.data.testTips = item.tips);
      this.setData({
        checkedItemCode:item.code
      })
      this.hide()
    },
    //当前选择的验证方式
    test:function(value){
      var regexpStr = this.data.testRegexpStr;
      if (regexpStr){
        var rgx = new RegExp(regexpStr,"g");
        return { isOk: rgx.test(value), tips: this.data.testTips}
        }else{
          console.log("当前未有验证规则配置！");
          return { isOk: true, tips:"未验证"}
        }
    },
    show: function () { this.selectComponent("#modal").show()},
    hide: function () { this.selectComponent("#modal").hide()},
  }
})
