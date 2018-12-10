// component/productListItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type:String,//显示数量 show , 操作 action , 不显示none
    count:{
      type:Number,
      value:0
    },
    cover: String,
    title:String,
    description:String,
    showIcon:Boolean,
    value1:String,
    value2:String,
    extra:Object

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
    _add(){
      this.setData({
        count: this.data.count+1
      })
    },
    _sub(){
      
      this.setData({
        count: this.data.count - 1
      })
    },
    _itemClick(e){
      console.log(e);
      this.triggerEvent('itemClick',this.data.extra,{})
    }

  }
})
