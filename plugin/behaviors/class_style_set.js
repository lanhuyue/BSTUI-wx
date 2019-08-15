
module.exports = Behavior({
  externalClasses: ['C-box-class', 'C-title-class', 'C-content-class'],
  properties: {
    className: {
      type: String,
      value:"",
      observer: function (val) { this.setData({className:val})}
    },
    componentStyle:{
      type: String,
      value: "",
      observer: function (val) { this.setData({ componentStyle: val }) }
    }
  },
  data:{
  },
  methods:{
    /*
      检测object是否含有某组属性，例如：
      var obj={name:"test",age:10};
      var one=hasKey(obj,["name","age"]),two=hasKey(obj,["name","age","ather"]);
      one//true;
      two//false
    */
    hasKey:function (obj, keyArray) {
      if(obj instanceof Object && keyArray instanceof Array) {
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
  }
})