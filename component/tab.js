// component/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:Array,
    currentIndex:Number,
    paddingLeft:Number,
    paddingRight:Number,
    tabSpace:Number,
    type:{
      type:String,
      value:"scroll"
    },
    tabNameKey:{
      type:String,
      value:""
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
    _onTabClick(e){
      var index = e.currentTarget.dataset.index;
      this.triggerEvent("tabClick",{index},{});
      this.setData({
        currentIndex:index
      })
    }
  }
})
