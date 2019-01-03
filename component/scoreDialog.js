// component/scoreDialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    score:{
      type:String,
      value:"0"
    },
    show:{
      type:Boolean,
      value:true
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
    hide(e){
      this.setData({
        show:false
      })
      this.triggerEvent("close",{},{})
    }
  }
})
