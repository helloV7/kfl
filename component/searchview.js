// component/searchview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight:0,
    inputString:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _input(e){
      this.data.inputString=e.detail.value;
    },
    _clearInputClick(){
      this.setData({
        inputString:""
      })
    },
    _itemClick(e){

    },
    _onConfirmClick(e) {
      this.triggerEvent("inputConfirm",{input:e.detail.value},{});
    },
    _cancelClick(){

      this.triggerEvent("cancelClick",{},{});
    }
  },
 
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {

    // 在组件实例进入页面节点树时执行
    wx.getSystemInfo({
      success: (res)=> {
        this.setData({
          windowHeight:res.windowHeight
    })
      },
    })
    
  },
 
})
