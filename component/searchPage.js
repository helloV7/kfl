// component/searchview.js

let oldKey
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inputString:{
      type:"String",
      value:""
    },
    showPage:{
      type:Boolean,
      value:false,
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        if(newVal){
          this._loadHistory()
          this.setData({
            inputString:oldKey,
            focus:true
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowHeight:0,
    history:[],
    focus:true
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
      console.log(e)
      let index = e.currentTarget.dataset.index
      let key = this.data.history[index]
      this.setData({
        inputString: key
      })
      this.triggerEvent("inputConfirm", { key: key }, {});

    },
    _onConfirmClick(e) {
      let key = e.detail.value
      wx.getStorage({
        key: 'searchKeys',
        complete: function(res) {
          let keys = res.data
          if (keys==null){
            keys = []
          }
          for(let i=0;i<keys.length;++i){
            if(keys[i]==key){
              keys.splice(index,1)
              break
            }
          }
          keys.splice(0, 0, key)
          if(keys.length>20){
            keys.splice(keys.length-1,1)
          }

          console.log(key,keys)
          wx.setStorage({
            key: 'searchKeys',
            data: keys
          })
        },
        
      })
      oldKey = key
   

      this.triggerEvent("inputConfirm", { key: key},{});
    
    },
    _cancelClick(){
      // this.setData({
      //   showPage:false,
      //   inputString:oldKey
      // })
      // this.triggerEvent("cancel",{},{});

      this.setData({
        showPage:false,
        inputString:""
      })
      this.triggerEvent("inputConfirm", { key: "" }, {});

    },
    _loadHistory(){
      wx.getStorage({
        key: 'searchKeys',
        success:  (res) =>{
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
