// component/productListItem.js
import api from '../utils/api.js'
var app = getApp()
var loading = false
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scId:String,//购物车Id
    pId:String,
    type:String,//显示数量 show , 操作 action , 不显示none
    count:{
      type:Number,
      value:0,
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        this.data._count = newVal
      }
    },
    cover: String,
    title:String,
    // description:String,
    specification:String,//规格
    number:String,//编号
    showIcon:{
      type:String,
      value:'false'
      },
    showValue1:{
      type:String,
      value:'true'
    },
    value1:String,
    showValue2:{
      type: String,
      value: 'true'
    },
    value2:String,
    extra:Object

  },

  /**
   * 组件的初始数据
   */
  data: {
    _count:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _add(){
      if (loading){
        return
      }
      loading = true

      if(this.data.count == 0){
        this._firstAdd()
      }else{
        this._updateCount(Number.parseInt(this.data.count) + 1)
      }
     
    },
    _sub(){
     
      if (loading){
        return
      }
      loading=true
      if(this.data.count==1){
        this._delInShopCart()
      }else{
        this._updateCount(Number.parseInt(this.data.count) - 1)
      }
     
    },
    _itemClick(e){
      this.triggerEvent('itemClick',this.data.extra,{})
    },
    _firstAdd(){
      api.request({
        url:"SHOPPING_CAR_ADD",
        method:"POST",
        showLoading:true,
        param:{
          goodsId: this.data.pId,
          buyNum:1,
          handleType:"1"
        },
        callback:(b,json)=>{
          if(b){
            this.setData({
              count: this.data.count + 1,
              scId:json.data.shopcarId
            })
          }
          loading = false
        }
      })
    },
    _updateCount(count){
      api.request({
        url: "SHOPPING_CAR_UPDATE",
        method: "POST",
        showLoading: true,
        param: {
          shopcarId:this.data.scId,
          goodsId: this.data.pId,
          buyNum: count,
          handleType: "0"
        },
        callback: (b, json) => {
          if(b){
            this.setData({
              count: count
            })
          
            this.triggerEvent("updateCount", { extra: this.data.extra, count: count},{})
          
          }
          loading = false

        }
      })
    },
    _delInShopCart(){
      api.request({
        url:"SHOPPING_CAR_DEL",
        method:"POST",
        showLoading:true,
        param:{
          shopcarId:this.data.scId
        },
        callback:(b,json)=>{
          if(b){
            this.setData({
              count: 0
            })
          }
          loading=false
          this.triggerEvent("updateCount", { extra: this.data.extra, count: 0 }, {})

        }
      })


    }

  }
})
