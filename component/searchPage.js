// component/searchview.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showPage:{
      type:Boolean,
      value:false,
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        if(newVal)
          this._loadHistory()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight:0,
    inputString:"",
    history:[]
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
      let index = e.currengTarget.dataset.index
      let key = this.data.history[index]
      this.setData({
        inputString: ""
      })
      this.triggerEvent("inputConfirm", { key: key }, {});

    },
    _onConfirmClick(e) {
      let key = e.detail.value
      wx.getStorage({
        key: 'searchKeys',
        success: function(res) {
          let keys = res.data
          if (keys==null){
            keys = []
          }
          keys.push(key)
          wx.setStorage({
            key: 'searchKeys',
            data: keys
          })
        },
      })
      this.setData({
        inputString: ""
      })

      this.triggerEvent("inputConfirm", { key: key},{});
    
    },
    _cancelClick(){
      this.setData({
        inputString: "",
        showPage:false
      })
      // this.triggerEvent("cancelClick",{},{});
    },
    _loadHistory(){
      wx.getStorage({
        key: 'searchKeys',
        success: function (res) {
          let keys = res.data
          if (keys == null) {
            keys = []
          }
          this.setData({
            history: keys
          })
        },
      })
    },
 
  },
 
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {
  },
 
})
