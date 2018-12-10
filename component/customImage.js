// component/customImage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultImage:{
      type:String,
      value:'/resource/image/image-placeholder.png'
    },
    originImage:{
      type:String,
      value:''
    },
    width:{
      type: Number,
      value:0
    },
    height:{
      type:Number,
      value:0
    }
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDefault:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _onImageLoadFinish(e){
    //   this.setData({
    //     showDefault:false
    //   })
    },
    _onImageLoadError(e){
      this.setData({
        showDefault: true
      })
    }
  }
})
