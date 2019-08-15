/**
 * barcode:条形码（一维码）/二维码生成组件
 * --------------------------------------------------
 * props：{
 *      value:需要生成条形码的字符串,
 *      type:生成码的类型（1d/2d）默认为2d,
 *      encodingMethod:编码方式，默认为code128；当type为2d时无效
 *                    （当前支持：/std25/int25/ean8/ean13/upc/msi/code11/code39/code93/code128/codabar/datamatrix）,
 *      color:颜色,
 *      bgColor:背景颜色,
 *      showText:true是否显示文字,
 *      barCellWidth:单元格宽度,
 *      barHeight:高度,
 *      componentStyle:容器样式,
 *      className:容器样式类名,
 *      loadTips:加载（绘制二维码）等待时间的提示,
 * }
 * events:{
 *      change:条形码（生成/更新）完成后触发
 * }
 */
import { BarCode } from "./barCodeDOMSource.js"
import { QRCode } from "./QRCodeTableSource.js"
var classAndStyleSet = require("../../behaviors/class_style_set.js");
Component({
  behaviors: [classAndStyleSet],
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String, value: "", observer: function (newVal, oldVal, changedPath) {
        console.log(newVal, this.data.boxWidth,"boxWidth")
        this.data.boxWidth&&this.initBaseUrl(newVal, this.data.encodingMethod)
      }
    },
    type: {type: String, value: "2d"},
    showText: { type: Boolean, value: true },
    color: { type: String, value: "#000000" },
    encodingMethod: { type: String, value: "code128" },
    bgColor: { type: String, value: "#ffffff" },
    barCellWidth: { type: Number, value: 2 },
    barHeight: { type: Number, value: 100 },
    barWidth: { type: Number, value: 100 },
    loadTips: { type: String, value: "您的码正在赶来..." },
    textStyle: { type: String, value: "" },
    padding: { type: Number, value: 20 },
  },

  /**
   * 组件的初始数据
   */
  data: {
    domStr: "",//图片链接地址
    isHidden: false,//canvas是否隐藏
    imgH: "100rpx",//canvas高度
    systemInfo: wx.getSystemInfoSync(),//系统配置信息
    boxWidth: "",//容器宽度
    boxHeight: "100rpx",//容器高度
  },
  ready:function(){
    var self = this;
    this.createSelectorQuery().select("#coderbox").boundingClientRect(function (rects) {
      rects&&self.setData({ boxWidth: rects.width }, function () {
        self.initBaseUrl(self.data.value, self.data.encodingMethod)
      });
    }).exec()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initBaseUrl: function (value, encodingMethod){
        if(!value&&value!='0'){return false};
      var
        self = this,
        data = self.data;
        switch(data.type){
          case "1d":
          var str= BarCode(value, encodingMethod, {
                color: data.color,
                bgColor: data.bgColor,
                width: data.boxWidth - data.padding,//这里的40为内边距
                barHeight: data.barHeight,
                // barWidth: data.barCellWidth,
              });
            self.setData({
              isHidden: true,
              domStr: str,
              boxHeight: "auto",
              barHeight: data.barHeight,
            });
            break;
          case "2d":
            var qr = new QRCode({
              width: data.boxWidth - data.padding,
              height: data.boxWidth - data.padding
            });
            self.setData({
              isHidden:true,
              domStr:qr.makeCode(data.value),
              boxHeight: "auto",
              barHeight: data.boxWidth - data.padding,
              });
            break;
        }
      self.triggerEvent('change', { code: data.value})
    }
  }
})
