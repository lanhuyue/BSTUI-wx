// plugin/components/BSTbutton/button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:{
      type: String,
      value: 'primary'    //wireframe warning
    },
    text:{
        type:String,
        value:'主操作'
    },
    width:{
        type: Number,
        value: 686
    },
    height:{
      type: Number,
      value: 92,
    },
    round:{
      type: Boolean,
      value: false
    },
    size:{
      type:Number,
      value:36,
    },
    disabled:{
      type: Boolean,
      value: false,
    },
    isShadow:{
      type: Boolean,
      value:false
    },
    FontColor:{
      type:String,
      value:'#fff'
    },
    IconConfig:{
      type:Object,
      value:{
        type:'',  //wxIcon fontIcon urlIcon
        iconType: '', //wxIcon 必传
        Size:35,
        color:'#f00',
        position:'left',
        source: '',   //urlIcon 必传
        sourceSise:[30,30],//表示图片图标大小 单位rpx
        spacing: 12,  //单位 只支持rpx
        fontClass: '' //fontIcon 必传
      }
    },
    wireframebg:{
      type: String,
      value: ''
    }, 
    borderText:{
      type: String,
      value: 'none'
    }
  },
  lifetimes:{
    attached:function(){
      let type = this.data.type, bgColor = '#fff',boederTx='none';
      switch (type){
        case 'warning':
          bgColor ='linear-gradient(315deg,rgba(251,87,42,1) 0%,rgba(255,139,82,1) 100%)'
          break;
        case 'wireframe':
          bgColor = this.data.wireframebg;
          boederTx=this.data.borderText
          break;
         default:
          bgColor = 'linear-gradient(315deg,rgba(74,152,255,1) 0%,rgba(100,193,255,1) 100%)'
          break;
      }
      this.setData({
        bgColor,
        der: boederTx
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    bgColor:'',
    der:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})
