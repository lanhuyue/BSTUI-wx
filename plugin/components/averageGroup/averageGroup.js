// plugin/components/averageGroup/averageGroup.js
import { formatCss, cssObjToString, mergeCssStr} from '../../api/data.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array, value: [], observer: function (value) {
        this.setData({ newList: this.initList(value, this.data.value) })
      }},
    value: {
      type: Array, value: [], observer: function (value) {
        setTimeout(() => {
          let
            { valueKey,checkedAry, newList  } = this.data,
            newValueStr = (valueKey == "bst_value" ? value : value.map((v) => v[valueKey])).join(""),
            checkedAryStr = (valueKey == "bst_value" ? checkedAry : checkedAry.map((v) => v[valueKey])).join("")
            ;
          if (newValueStr != checkedAryStr) {
            newList = newList.map((item) => {
              if (newValueStr.indexOf(item[valueKey]) != -1) {
                item._checked = true
              } else {
                item._checked = false
              }
              return item
            });
            this.setData({
              newList: newList,
              checkedAry: value
            })
          }
        }, 100)
      }
    },
    itemStyle: { type: String, value: "", observer: function (value) { this.initItemStyle(value)}},
    labelKey: { type: String, value: "bst_label" } ,
    valueKey: { type: String, value: "bst_value" },
    checkedStyle: { type: String, value: "" },
  },

  /**
   * 组件的初始数据
   */
  data: {
    newList: [],
    checkedAry:[],
    itemWidth:"",
    newItemStyle:"",
    column:3
  },
  attached:function(){
    this.initItemStyle(this.data.itemStyle);
    let list = this.initList(this.data.list, this.data.value) 
    this.setData({ newList: list })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initList: function(list, value) {
      let { labelKey, valueKey, newItemStyle, checkedStyle} = this.data;
      return list.map((item) => {
        if (!item.hasOwnProperty("checked")) {
          if (typeof item != "object") {
            let value = item;
            item = { _checked: false };
            item[labelKey] = value;
            item[valueKey] = value;
          } else {
            item._checked = false
          }
        }
        item._style = newItemStyle;
        let valueAry = valueKey == "bst_value" ? value : value.map((v) => v[valueKey]);
        if (valueAry.indexOf(item[valueKey]) != -1) { 
          item._checked = true 
          item._style = checkedStyle
        }
        return item
      })
    },
    itemClick: function(e) {
      let 
        { item, index } = e.currentTarget.dataset,
      list = JSON.parse(JSON.stringify(this.data.newList));
      list[index]._checked = !item._checked;
      list[index]._style = this.data[list[index]._checked ? "checkedStyle" :"newItemStyle"];
      let checkedAry = [];
      for (let i = 0, n = list.length; i < n; i++) {
        let item = JSON.parse(JSON.stringify(list[i]));
        if (item._checked) {
          if (this.data.valueKey == "bst_value") {
            item = item.bst_value
          } else {
            delete item._checked;
            delete item._style;
          }
          checkedAry.push(item)
        } else { continue }
      }
      this.setData({
        newList: list,
        checkedAry: checkedAry,
      });
      this.triggerEvent("change", { checked: checkedAry })
    },
    initItemStyle:function(value){
      let w = formatCss(value).width || "30%";
      /px/.test(w) && setTimeout(() => {
        wx.createSelectorQuery().in(this).select('#agBox').boundingClientRect((rect) => {
          let boxWidth = rect.width * 2;
          this.setData({
            column: Math.floor(boxWidth / parseFloat(w))
          })
        }).exec()
      })
      let 
        {checkedStyle}=this.data,
        newItemStyle = mergeCssStr({}, { width: w },value);
      this.setData({
        itemWidth: w,
        checkedStyle: cssObjToString(mergeCssStr({}, newItemStyle, checkedStyle)),
        column: Math.floor(100 / parseFloat(w)),
        newItemStyle: cssObjToString(newItemStyle)
      })
    }
  }
})
