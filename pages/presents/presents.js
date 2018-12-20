// pages/presents/presents.js
import api from '../../utils/api.js'
var app = getApp()
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
    typeList:[],
    currentTypeIndex:0,
    productList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getType(){
      api.request({
        url:"PERSENT_TYPE",
        method:"GET",
        callback:(b,json)=>{
          if(b){
            this.setData({
              typeList:json.data
            })
            this._getTypeProduct()
          }
        }
      })
      
    },
    _getTypeProduct(){
      let type = this.data.typeList[this.data.currentTypeIndex]

      api.request({
        url:"PRESENT_PRODUCT_LIST",
        method:"GET",
        showLoading:true,
        param: { cId: type.id},
        callback:(b,json)=>{
            if(b){
              this.setData({
                productList:json.data
              })
            }
        }

      })
    },
    _onTypeClick(e){
      let index = e.currentTarget.dataset.index
      this.setData({
        currentTypeIndex:index
      })
      // let type = this.data.typeList[index]
      this._getTypeProduct()
    },
    _onItemClick(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/product/productDetail?id='+id,
      })
    }
  },
  attached(){
    this._getType()
  }
})
