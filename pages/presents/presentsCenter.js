// pages/presents/presentsCenter.js
import api from '../../utils/api.js'
var app = getApp()
let filterData = {}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    refresh:{
      type:String,
      value:"0",
      observer: function (newVal, oldVal, changedPath) {
        console.log(newVal)
        if (newVal=="1") {
          this._getType()
          this.setData({
            refresh: "0"

          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeList: [],
    currentTypeIndex: 0,
    productList: [],
    searchKey: "",
    page: 1,
    showSearchPage: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getType() {
      api.request({
        url: "PERSENT_TYPE",
        method: "GET",
        callback: (b, json) => {
          if (b) {
            this.setData({
              typeList: json.data
            })
            this._getTypeProduct(true)
          }
        }
      })

    },
    _getTypeProduct(isRefresh) {
      let page = isRefresh ? 1 : (this.data.page + 1)
      let type = this.data.typeList[this.data.currentTypeIndex]

      if(type==null){
        wx.stopPullDownRefresh()
        return;
      }

      // cId	string	是	分类id
      // scoreSort	string	否	积分排序：1代表从高到低，2代表从低到高
      // capacitySort	string	否	容量排序：1代表从高到低，2代表从低到高
      // screenData	string	否	items格式：[{ itemId: [1, 2, 3], searchId: 1 }]
      // count	string	否	查询数量，默认20条
      // page	string	否	页码，从1开始
      let param = Object.assign({
        cId: type.id,
        keyWord: this.data.searchKey,
        page: page
      },
        filterData)

      api.request({
        url: "PRESENT_PRODUCT_LIST",
        method: "GET",
        // showLoading: true,
        param: param,
        callback: (b, json) => {
          if (b) {
            let data = []
            if (isRefresh) {
              wx.stopPullDownRefresh()
            } else {
              data = this.data.productList
            }
            data = data.concat(json.data)
          
            this.setData({
              productList: data,
              page: page,
            })
          }
        }

      })
    }, filterTabConfirm(e) {
      console.log(e)
      filterData = e.detail
      this._getTypeProduct(true)
      this.setData({
        showSearchPage: false
      })
    },
    openSearchPage(e) {
      console.log(e)
      this.setData({
        showSearchPage: true

      })
    },
    searchPageConfirm(e) {
      console.log(e)
      let key = e.detail.key
      this.setData({
        searchKey: key,
        showSearchPage: false
      })
      this._getTypeProduct(true)
    },
    searchPageCancel() {
      this.setData({
        showSearchPage: false
      })
    },
    loadMore() {
      this._getTypeProduct(false)
    },
    productItemClick(e) {
      let index = e.currentTarget.dataset.index
      let id = this.data.productList[index].goodsId
      wx.navigateTo({
        url: '/pages/product/productDetail?id=' + id,
      })
    },
    tabClick(e){
      let index = e.detail.index
      this.setData({
        currentTypeIndex:index
      })
      this._getTypeProduct(true)
    },
    navToShopCar(){
      wx.navigateTo({
        url: '/pages/shoppingcar/shoppingcar',
      })
    }
  },
  attached(){
    this._getType()
  }
})
