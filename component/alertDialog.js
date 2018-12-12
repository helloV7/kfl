// component/alertDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message:String,
    cancelText:{
      type:String,
      value:'取消'
    },
    confirmText: {
      type: String,
      value: '确定'
    },
    show:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _nothing(e){

    },
    _modalBgClick(e){
      this.setData({
        show:false
      })
      // this.triggerEvent('itemClick', this.data.extra, {})
    },
    _onCancelClick(e){
        this.triggerEvent('cancel', {}, {})
    },
    _onComfirmClick(e) {
      this.triggerEvent('comfirm', {}, {})
    }
  }
})
