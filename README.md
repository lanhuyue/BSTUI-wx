


# 插件使用

## 小程序插件使用

**app.json配置**
    
```json
    "plugins": {
        "BSTCommon": {
          "version": "1.0.9",
          "provider": "wx3f99db061dbc1dd3"
        }
    }, 
```
**需要使用插件的页面**
```
    <!--json内-->
   "usingComponents": {
        "calendar": "plugin://BSTCommon/calendar"
    }
    <!--wxml内-->
    <calendar
            type='range'
            monthShowNum='{{3}}'
            markerData="{{markerData}}"
            monthShowDate="2019-08-01"
            bindchange='ondatechange'
            bindcheckStart='oncheckStart'
    />
    <!--js内-->
    let {
          InitDateObj,                     //初始化时间类
          patternGetValue,                 //取值模式
          drillJSON,                       //下钻json数据
          myFor,                           //循环
          duplicateRemoval,                //数组去重
          hasKey,                          //判断对象是否含有某些值
          formatCss,                       //格式化css字符串
          cssObjToString,                  //将一个css样式对象转化为字符串
          mergeCssStr,                     //合并css字符串、对象
          Displacementer,                  //坐标换算类
          initAryforJSON                   //初始化json数组
    } = requirePlugin('BSTCommon')；
    
    //js内可以引入插件提供的一些类或者方法，不使用也可以不引入或按需引入
	
```

## git代码下载使用

> 如果需要使用最新版的功能可将github上代码中plugin复制到本地项目中直接以自定义组件的形式引用


**演示demo（小程序：ChiselUI）**

![BSTUI](./BSTUIQR.jpg)
    
---
# Component组件类
> 引入组件时有可能开发工具会报（.wxss文件内）错；这个是样式警告，经咨询微信官方人员可以忽略。

## **flexBox**:双栏弹性盒子

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
start | String|false|""|--|第一个容器的长度
end | String|false|""|--|第二个容器的长度
vertical | Boolean|false|false|false/true|是否垂直排列
noAutoZIndex | String|false|0|--|当前固定容器的z-index
> 说明：start/end只传一个，传入的为固定容器，另外的容器自适应剩余空间。

 **示例代码**
```javascript
    <flexBox start='20%'>
        <view slot='start'>这个是固定容器</view>
        <view slot='end'>这个是自适应容器</view>
    </flexBox>
```
---

## **coder**:条形码（一维码）/二维码生成组件

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
value | String|false|""|--|需要生成条形码的字符串
type | String|false|"2d"|1d/2d|生成码的类型
encodingMethod | String|false|"code128"|std25、int25、ean8、ean13、upc、msi、code11、code39、code93、code128、codabar、datamatrix | 编码方式（当type为1d时生效）
color | String|false|#000000|#******|前景色
bgColor | String|false|#ffffff|#******|背景颜色
showText | Boolean|false|true|true/false|是否显示文字
barCellWidth | Number|false|2|int|单元格宽度（px）当type为1d时生效
barHeight | Number|false|100|int|高度（px）当type为1d时生效
componentStyle | cssString|false|——|——|组件容器的样式
loadTips | String|false|"您的码正在赶来..."|--|加载（绘制二维码）等待时提示语
textStyle | cssString|false|--|--|显示文本的样式（value）
padding | Number|false|20|--|整个码容器的内边距

> 说明：条形码/二维码的宽度跟随容器的宽度自适应计算，容器的宽度可通过componentStyle来设置。

evnets | event.detail | explain
---|---|---
change|{code:value}|条形码/二维码生成（更新）完成后触发

 **示例代码**

```javascript
    <--条形码-->
    <coder 
        value='123456789'
        type='1d'
        encodingMethod='code93'
        barHeight='{{70}}'
        componentStyle='width:50%'
        bindchange='oncoderchange'
    />
    <--二维码-->
    <coder
        value='https://www.tz12306.com'
        componentStyle='width:100%'
    />
```
---

## **modal**:基础模态框

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
type | String|true|--|dialog、drawer-bottom、drawer-right、drawer-top、drawer-left|模态框的类型（居中、下、右、上、左）
show | Boolean|true|false|true/false|动态控制模态框的显示与隐藏
title | Boolean|false|false|false/true|是否含有title
bodyStyle | cssString|false|--|--|bodyCSS样式
maskStyle | cssString|false|--|--|maskCSS样式
contentStyle | cssString|false|--|--|contentCSS样式
time | Number|false|300|int|动画时长（毫秒）
noMaskEvnet | Boolean|false|false|true/false|是否禁止mask点击事件

slot | explain
---|---
default|主体
title|头部
footer|尾部

evnets | event.detail | explain
---|---|---
hide|--|模态框隐藏时触发事件

> 说明：此组件为底层组件支持5种类型，使用时需传入类型值、常用为dialog。

 **示例代码**
```javascript
    <modal
        type='dialog'
        show='{{modalshow}}'
        bindhide='onhide'
        noMaskEvnet='{{true}}'
        bodyStyle=''
        title='{{true}}'
    >
        <view slot='title'>这是头部</view>
        <view>这是主体内容</view>
        <view slot='footer'>这是尾部</view>
    </modal>
```
---

## **dialog**:模态弹窗（基于modal）

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
show | Boolean|true|false|--|动态设置弹窗显示与隐藏
save | String|true|"确定"|--|保存按钮文字内容
openType | String|false|--|share、launchApp、openSetting、feedback|保存按钮的微信开放能力
bodyStyle | cssString|false|--|--|bodyCSS样式
cancelStyle | cssString|false|--|--|取消按钮CSS样式
saveStyle | cssString|false|--|--|保存按钮CSS样式
cancel| String|false|"取消"|--|取消按钮文字样式
noMaskEvnet | Boolean|false|false|true/false|是否禁止mask点击事件

slot | explain
---|---
default|主体

evnets | event.detail | explain
---|---|---
hide|--|模态框隐藏时触发事件
saveCallback|e.detail|保存按钮点击时触发
cancelCallback|--|取消按钮点击时触发
examplePipe|{example:实例对象}|组件渲染完成后触发的实例传输管道，返回当前实例对象（初始化可保存此实例对象，然后调用实例对象的show/hide来进行弹窗的显示与隐藏）

> 说明：save与cancel同时存在时占位各为50%，如果只有save则为100%；如果获取到实例对象、可手动调用实例对象的show方法进行显示弹窗；show方法可接受一个参数OBJECT，其中key可以为props中所有的参数，执行时会覆盖组件初始传入的值（可实现一个组件，多处调用）；其中content字段为特殊字段，可接受HTML字符串渲染

 **示例代码**
```javascript
    <!--模板调用-->
    <dialog 
        show='{{dialogshow}}'
        save='确定'
        noMaskEvnet='{{true}}'
        bindsaveCallback='onsaveclick'
    >
        <view>这是主体内容</view>
    </dialog>
    <!--实例调用-->
    //wxml内
    <dialog bindexamplePipe='onexamplePipe'/>
    //js内
    onexamplePipe:function(e){
        let this.dialog=e.currentTarget.detail.example;
        //此实例还可以其他地方调用，如果传入与props相同的字段则覆盖props内的相应值
        this.dialog.show({
            content:'<div style="color:#999">我是HTML字符串内容哦</div>',
            saveCallback:function(e){
                console.log("我是点击的回调"，e)
            }
        })
    }
```
---

## **calendar**:基础日历渲染器

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
type | String|false|point/range|"point"|日历类型（点选/范围选择）
title | Array|false|[]|["日", "一", "二", "三", "四", "五", "六"]|日历星期栏内容设置，数组长度为7
value | Array|false|[]|["YYYY-MM-DD"]|初始化选择的日期，type为range时数组可有两个值
monthShowDate | String|false|当前月份|"YYYY-MM-DD"|显示第一个月月份时间，如果不设置则为当月01号，日历渲染则根据月份动态渲染，如果设置，可固定显示一个时间段
monthShowNum | Number|false|1|int|当前渲染的月份数，如果没有必要，请不要设置过大影响渲染性能
markerData | Object|false|{}|{"YYYY-MM-DD":{top,bottom,topStyle,bottomStyle,style}}|特殊日期数据对象，例如{"2019-08-08":{bottom:"立秋",bottomStyle:"color:red"}}
boxStyle| cssString|false|--|--|容器外部盒子样式
titleStyle| cssString|false|--|--|星期栏样式
todayStyle| cssString|false|--|--|"今天"日期样式
checkedStyle| cssString|false|--|--|选中日期样式
checkedFGStyle| cssString|false|--|--|选中日期前景样式
rangeStyle| cssString|false|--|--|选中范围日期样式（type=range有效）
monthTitleStyle| cssString|false|--|--|每个月的月份title样式

evnets | event.detail | explain
---|---|---
examplePipe|{{setMethod:function(methName,fun){}}}|日历渲染完成后的实例传输管道，返回calendar实例的setMethod(注入方法)方法，此方法接受一个需要注入方法的名称methName（目前只支持"blackout"）和一个回调函数（function，回调参数为一个object，内含当前日期的相关数据），此个回调函数必须输出一个（Boolean）布尔值来决定当前天是否禁止点击
change|["YYYY-MM-DD","YYYY-MM-DD"]|选中的值改变时触发，返回数组，type=range时为两个值
checkStart|["YYYY-MM-DD"]|范围选择开始事件，只有当type=range时才触发，返回的数组只有一个值（此事件可配合change事件来判断当前用户操作是否选择范围时间完成）

> 说明：calendar组件为dateSelector的基础渲染组件，大部分参数相同，onexamplePipe使用也相同

 **示例代码**
```javascript
    <!--wxml内-->
   <calendar
            type='range'
            monthShowNum='{{3}}'
            markerData="{{markerData}}"
            monthShowDate="2019-08-01"
            bindchange='ondatechange'
            bindcheckStart='oncheckStart'
    />
    <!--js内-->
    data: {
        markerData:{
          "2019-08-08": { bottom:"立秋"},
          "2019-08-15": { bottom:"中元节"},
          "2019-08-23": { bottom:"处暑"},
          "2019-09-08": { bottom:"白露"},
          "2019-09-10": { bottom:"教师节"},
          "2019-09-13": { top:"休", bottom:"中秋"},
          "2019-09-14": { top:"休"},
          "2019-09-15": { top:"休"},
          "2019-09-23": { bottom:"秋分"},
          "2019-09-29": { top:"班"}
        },
    },
    ondatechange:function(e){
        console.log(e)
    },
    oncheckStart:function(e){
        console.log(e)
    },
```
---

## **dateSelector**:日历选择器（基于calendar、modal）

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
show | Boolean|true|false|true/false|动态控制日历选择器的显示与隐藏
value | Array|false|[]|["YYYY-MM-DD"]|日历选择的日期
title | String|false|--|--|头部标题内容，当设置值为'auto'时，即为动态展示当前选择的日期
type | String|false|"point"|point/range|日历类型point为点选；range为范围选择
monthShowDate | String|false|--|YYYY-MM-DD|第一个显示月的时间
monthShowNum | Number|false|1|int|初始化渲染多少个月
bodyStyle | cssString|false|--|--|类似modal的bodyStyle
titleStyle | cssString|false|--|--|头部title的样式内容
dateTitleStyle | cssString|false|--|--|日历头部的样式（就是星期那一行）
float | String|false|"bottom"|top、right、bottom、left|浮动方式
markerData | Object|false|{} | {"YYYY-MM-DD":{top:"这是显示在日期day数字上方的文字",bottom:"这是显示在下方的内容",topStyle:"",bottomStyle:"",style:""}} | 特殊日期显示内容（例如：春节、中秋）,可相应位置设置样式
checkedStyle | cssString|false|--|--|选中的样式
checkedFGStyle | cssString|false|--| -- | 选中的前景样式；此样式因为calender组件内部结构特殊，需过滤掉影响宽高的css属性，过滤规则包含[/^width/, /^height/, /^padding\S\*/, /^margin\S\*/]凡是匹配此类属性，都将设置无效；
rangeStyle | cssString|false|--|--|范围样式
monthTitleStyle | cssString|false|--|--|月份标题样式
leftButtonStyle | cssString|false|--|--|左边（more/取消）按钮样式
sureStyle | cssString|false|--|--|确定按钮样式
todayStyle | cssString|false|--|--|今天的样式
hasMore | Boolean|false|false|true/false|是否开启更多按钮，当设置为true时，左边按钮内容由“取消”变为“more”并且有四个默认的功能（后续会拓展自定义功能按钮）

evnets | event.detail | explain
---|---|---
change|[YYYY-MM-DD]|选择日期完成后触发，返回参数为选择的日历数组
examplePipe|{setMethod:function(methName,fun){}}|日历渲染完成后的实例传输管道，返回calendar实例的setMethod(注入方法)方法，此方法接受一个需要注入方法的名称methName（目前只支持"blackout"）和一个回调函数（function，回调参数为一个object，内含当前日期的相关数据），此个回调函数必须输出一个（Boolean）布尔值来决定当前天是否禁止点击

> 说明：examplePipe或许比较难以理解（因遵循小程序插件开发规范，props不能传入非json数据类型的数据，所以props不能传入function；故只能通过这种方式将一个条件方法注入实例内部；来实现最大灵活的的日期禁用状态渲染）

 **示例代码**
```javascript
    <!--wxml内-->
    <dateSelector
        value="{{datevalue}}"
        bodyStyle='height:800rpx'
        monthShowNum='{{3}}'
        bindexamplePipe='dipachExample'
        bindchange='ondatechange'
    >
          <button>日期选择</button>
    </dateSelector>
    <!--js内-->
    dipachExample:function(e){
        //实例管道会返回一个注入方法函数（当前只支持注入方法blackout）
        let 
        now=new Date().getTime()-1000*60*60*24,
        setMethod = e.detail.setMethod;
    
        setMethod("blackout",(dateObj)=>{
          return now <= dateObj.timeStamp
        })
    }
```
---

## **count**:计数器

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
type | String|false|"default"|img/default|计数器类型；img为icon为图形
value | Number|false|0|int|设置计数器的值（可动态设置）
max | Number|false|100|int|最大值
min | Number|false|0|int|最小值
interval | Number|false|1|int|递增/递减的间隔数
iconURL | Object|false|{"R":[],"P":[]}|--|icon图片的URL路径对象{R:[],P:[]}其中R为递减的图片路径集合，集合包含两个值；第一个为可点击状态，第二个为禁止点击状态；P为递增
textStyle | cssString|false|--|--|中间数字的样式

evnets | event.detail | explain
---|---|---
change|{value:number}|数字改变时候出发

 **示例代码**
```javascript
    <count 
        max='{{10}}'
        bindchange='oncountchange'
    />  
```
---

## **drawer**:抽屉盒子

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
switch | Boolean|false|false|true/false|动态设置抽屉盒子的开关
iconRotate | Array|false| ["45","135"]|--|右边icon的展开与闭合的旋转角度
contentStyle | cssString|false|--|--|内容容器样式
titleStyle | cssString|false|--|--|头部样式

slot | explain
---|---
title|头部内容
content|主体内容

 **示例代码**
```javascript
   <drawer 
        switch='{{true}}'
   >
        <view slot='title'>我是标题</view>
        <view slot='content'>主体内容</view>
   </drawer>
```
---

## **STBox/STItem**:滚动吸顶盒子（组）

STBox

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
scrollTop | Number|false|0|int|容器初始滚动值
boxStyle | cssString|false|--|--|组件容器样式

STItem

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
boxStyle | cssString|false|--|--|组件容器样式
contentStyle | cssString|false|--|--|内容样式
translateY | Number|false|0|int|垂直方向移动距离
triggerOffset | Number|false|0|int|触发吸顶的偏移距离
STStyle | cssString|false|--|--|吸顶后的样式


evnets | event.detail | explain
---|---|---
ST|{ isST:true, translateY: 0 }|STItem的吸顶事件；会返回相应的偏移值

> 说明：STBox需与STItem配套使用

 **示例代码**
```javascript
    <STBox boxStyle='height:700rpx'>
        <view>这些是正常的内容</view>
        <view>这些是正常的内容</view>
        <view>这些是正常的内容</view>
        <view>这些是正常的内容</view>
        <STItem STStyle='background-color:#fff;width:100%;' >
            <view>我是滚着滚着就吸顶的内容</view>
        </STItem>
        <view>这些是正常的内容</view>
        <view>这些是正常的内容</view>
    </STBox>
```
---

## **Cslider**:滑块组件（可双滑块）

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
type | String|false|"default"|range/default|滑块类型；range范围选择（出现两个手柄）；default为点选（只有一个滑动手柄）
value | Array|false|[]|--|动态设置滑块的值
scale | Array|true|--|--|如果mode为custom时必传，JSON的数组
mode | String|false|"ratio"|ratio/custom|滑块的模板ratio为百分比；custom自定义
minRange | Number|false|1|int|最小间隔区域
valueKey | String|false|"bst_value"|--|当mode为custom时JSON内部值唯一字段（类似数据的id）
checkedColor | String|false|#38A8F6|#******|选中横线的颜色
unCheckedColor | String|false|#CCCCCC|#******|未选中横线的颜色

evnets | event.detail | explain
---|---|---
change|[]|scale中被选中的值

 **示例代码**
```javascript
    <!--wxml内-->
   <Cslider 
        scale='{{testList}}'
        mode='custom'
        type='range'
        valueKey='label'
        bindchange='onsliderchange'
    /> 
    <!--js内-->
    data:{
        testList: [
          {label:"item1",data:{test:"112212"}},
          {label:"item2",data:{test:"112212"}},
          {label:"item3",data:{test:"112212"}},
          {label:"item4",data:{test:"112212"}},
          {label:"item5",data:{test:"112212"}},
        ]
    },
```
---

## **Ctab/CtabItem**:选项卡（组）

Ctab

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
current | Number|false|0|int|当前选中的item的index(可动态设置)
titleItemWidth | Number|false|100|int|title里面的button的宽度
titleCheckedStyle | cssString|false|""|--|选中的title内button的样式

CtabItem

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
title | String|false|"title"|--|title内button的文本
data | null|false|""|--|需要传递的数据，会在Ctab的change事件中返回
icon | String|false|""|URL|title内部button前面的icon（必须为URL）
itemStyle | cssString|false|""|--|content内容部分的容器的样式

evnets | event.detail | explain
---|---|---
change|CtabItem中data参数|作用于Ctab，当选中值改变时触发

> 说明：Ctab与CtabItem需配套使用，CtabItem可以左右滑动来切换选择的值

 **示例代码**
```javascript
    <Ctab 
        current='{{0}}'
        bindchange='ontabchange'
    >
        <CtabItem 
            title='我是标题1' 
            icon='https://miniapp.scqcp.com/images/cityline_siji.png'
            itemStyle='padding:30rpx 0'
        >
            <view>我是内容1哦<view>
        </CtabItem>
        <CtabItem 
            title='我是标题2' icon='https://miniapp.scqcp.com/images/cityline_ren.png'
        >
            我是内容2
        </CtabItem>
    </Ctab>
```
---

## **Cinput**:输入框（清除icon）

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
type | String|false|"text"|text、number、idcard、digit|输入框的类型（可参照小程序开发文档input组件）
boxStyle | cssString|false|""|--|组件容器样式
inputStyle | cssString|false|""|--|输入框input样式
value | String|false|""|--|初始化输入框的值（可动态设置）
disabled | Boolean|false|false|true/false|是否禁止当前组件
startIconType | String|false|"search"|success, success_no_circle, info, warn, waiting, cancel, download, search, clear|头部icon类型（参照微信小程序开发文档icon）
startIconColor | String|false|""|#******|头部icon的颜色（当传入此选项或startIconURL时才具有头部的icon图标）
clearColor | String|false|""|#******|尾部清除icon的颜色（当传入此选项时组件才具有清除按钮）
startIconURL | String|false|""|URL|头部icon的url路径（如果传入此选项，startIconType与startIconColor选项无效）
focus | Boolean|false|false|true/false|自动获取焦点
confirmType | Boolean|false|false|true/false|设置键盘右下角按钮的文字，仅在type='text'时生效
cursorSpacing|Number|false|0|int|指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
maxlength | Number|false|140|int|最大输入长度，设置为 -1 的时候不限制最大长度
placeholder|String|false|""|--|输入框为空时占位符
placeholderStyle|cssString|false|""|--|输入框为空时占位符的样式



evnets | event.detail | explain
---|---|---
input|{value, cursor, keyCode}|键盘输入时触发（点击清除icon的时候也会触发该事件）
focus|{ value, height }|输入框聚焦时触发
blur|{value: value}|输入框失去焦点时触发
confirm| {value: value}|点击完成按钮时触发

 **示例代码**
```javascript
  <Cinput 
          startIconColor='#ddd'
          clearColor='#ddd'
  />
```

---

## **LSDrawer**:左滑抽屉/（删除）盒子

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
slidingDistance | String/Number|false|"30%"|int、/\d+px$/、百分比|可滑动的距离，为Number类型时默认添加单位“px”，字符串类型时可以为“100px”或“40%”这样的格式
hiddenValue | String|false|"删除"|--|隐藏区域的文本内容
hiddenStyle | cssString|false|""|--|隐藏区域的样式
customHidden | Boolean|false|false|true/false|是否自定义隐藏区域内容
data | null|false|""|--|需要传递的数据（clear事件会返回）
isOpen | Boolean|false|false|true/false|是否展开（可动态设置）



evnets | event.detail | explain
---|---|---
clear|props传入的data|点击隐藏区域的"删除"按钮触发（当customHidden为true时无效）

slot | explain
---|---
default|主体内容
hidden|自定义隐藏区域的内容

 **示例代码**
```javascript
  <LSDrawer isOpen='{{true}}'>
          test2
  </LSDrawer>
```
---

## **Cheader**:自定义导航栏

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
boxStyle | cssString|false|""|--|组件容器样式（可动态改变，例如动态改变不透明度）
leftStyle | cssString|false|""|--|左边返回按钮区域的样式
centerStyle | cssString|false|""|--|内容区域的样式
backWidth | cssString|false|"50px"|--|返回按钮区域的宽度
backZindex | String|false|"5"|--|返回按钮区域的z-index

evnets | event.detail | explain
---|---|---
back|--|点击back按钮时的回调
examplePipe|{height}|实例管道事件（当组件初始化后，会调用该事件，参数height为导航条的真实高度）

slot | explain
---|---
default|主体内容

> 此header只具有导航条的样式，不具备回退（back）交互功能；如需返回上一页，请绑定back事件自行回退（受小程序插件约束，插件内部不能控制路由相关操作）

 **示例代码**
```javascript
    <!--wxml内-->
  <Cheader
    boxStyle='color:#fff;background-color:#157CF0'
    bindexamplePipe='onexamplePipe'
    bindback='onback'
  >我是一个导航条</Cheader>
  <!--js内-->
  onexamplePipe:function(e){
    console.log(e.detail,"这是导航条的高度，可根据此高度设置内容区域的padding或者margin防止导航条遮挡内容")
  },
  onback:function(e){
    console.log("这里可以控制路由返回")；
    wx.navigateBack({delta:1})
  },
```
---
## **queue/queueItem**:队列(组)

queue

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
type | String|false|"list"|equipartition、list、auto|组件类型；equipartition为均分两端对齐item排列，每个item宽度一致，间隙自适应；auto为每个item宽度自适应，排列inline；list为正常默认垂直排列
itemStyle | cssString|false|""|--|每个插入的item的样式，当type为equipartition时其中width属性（默认为30%/每行3个）决定每一行的个数并且过滤掉（marginLeft与marginRight的值），例如width：24%那么每一行就会有4个item；
boxStyle | cssString|false|""|--|组件容器样式

queueItem

props | type | isMast | defult|range|explain 
---|---|---|---|---|---
itemStyle | cssString|false|""|--|同queue的itemStyle但优先级高于它（用于特殊item的样式处理）

slot | explain
---|---
default|item插入内容

> queue队列需要queueItem搭配使用；type为equipartition时可拓展为宫格；type为auto可拓展为tag选择标签

 **示例代码**
```javascript
    <!--wxml内-->
  <queue 
    type='equipartition'
    itemStyle='background-color:red;margin-right:10rpx'
  >
    <queueItem>我是老大</queueItem>
    <queueItem>-.-！我不想和你们玩了</queueItem>
    <queueItem>我是老三</queueItem>
    <queueItem>我是老四</queueItem>
    <queueItem>我是老五</queueItem>
  </queue>
  
```
---
# JS API
``` javascript
<!--page.js内可这样引入-->

  let {
      InitDateObj,                     //初始化时间类
      patternGetValue,                 //取值模式
      drillJSON,                       //下钻json数据
      myFor,                           //循环
      duplicateRemoval,                //数组去重
      hasKey,                          //判断对象是否含有某些值
      formatCss,                       //格式化css字符串
      cssObjToString,                  //将一个css样式对象转化为字符串
      mergeCssStr,                     //合并css字符串、对象
      Displacementer,                  //坐标换算类
      initAryforJSON                   //初始化json数组
  } = requirePlugin('BSTCommon')
  
```
## InitDateObj：初始化时间类（class）
> 此类为静态方法类，提供的方法如下：

function | parameter（type） | return(type) |explain
---|---|---|---
getDivision|newModel（string）|D(object)|获取一个底层备用的模板数据对象，newModel为一个含有【YMDhms】这6个字母与其他分隔符组成的字符串；例如：“YYYY-MM-DD hh:mm:ss”;返回数据对象D：{division, getValueSequence}
completionStr|str（number）|newNumberSstring（string）|将各位数的数字转换为两位数的字符串，例如：str为1时返回"01"
initDate|date（Date/DateString）、model（string）|D(object)|初始化一个时间对象，参数model为含有【YMDhms】字母的字符串模板，例如："YYYY-MM-DD"；输出的D为一个object，含有对应的KEY以及值；例如：{Y:2019,M:5,D:23}
getDateString|date（Date/DateString）、model（string）|DateString（string）|获取一个时间字符串；例如：let mydatestr=InitDateObj.getDateString(new Date(),"YYYY-MM-DD/hh:mm:ss");mydatestr的值为2019-05-23/10:23:50;除【YMDhms】预留字母意外的分隔符可以用任意字符（包括汉字）；例如model可以为"YYYY年MM月DD日hh时mm分ss秒"
getNickname|date（Date/DateString）、model（string）|datename(string)|返回一个日期的昵称，当前有3个预留【今天、明天、后天】这三个时间以外的都为【周+Number】
getDate|date（DateString）、model（string）|Date(DateObject)|根据字符串生成时间对象
getDateDiffStr|start(必填),end（必填）,maxC,minC,config|DateString（string）|获取时间差值字符串；start为开始时间，end为结束时间；maxC、minC属于【YMDhms】中的一个字母，用来确定当前单位的左右边界；默认maxC=“Y” minC=“s”
countDown|option或者endTime、callback或者endTime、options、callback|null|次函数参数不定，当只有一个参数时，需为Object；且含有字段["timer", "date"]字段"timer"必须为函数；当传入两个参数时第一个为Date（Date/DateString）,第二个参数为回调函数；当传入三个参数时第一个为Date（Date/DateString），第二个为option，第三个为回调函数；
isLeapYear|year（Number）|Boolean|判断传入的年份是否为闰年
getMonthDayNum|year（Number）,month（Number）|dayNum(Number)|根据年月获取当前月有多少天（月份的范围是1-12）

---
## patternGetValue：模式取值（function）
> 此方法为模式取值方法，可用于组件内部取值模式由外部传入;返回一个按照传入模式取值后的值；

parameter-index| parameter|type|explain
---|---|---|---
0|obj|Object|此参数为取值对象
1|patternStr|String|取值模式字符串；例如：'body.data.value'或者'[0].label'

 **示例代码**
```javascript
    
  <!--js内 已引入patternGetValue-->
  let testList=[
      {label:"item1",data:{test:"112212"}},
      {label:"item2",data:{test:"112212"}},
      {label:"item3",data:{test:"112212"}},
      {label:"item4",data:{test:"112212"}},
      {label:"item5",data:{test:"112212"}},
    ];
    
    console.log(patternGetValue(testList,'[0].label'))
    //item1
    
```

---
小伙伴们JSapi文档暂时更新到这里，后续会继续更新

