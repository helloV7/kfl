// pages/product/productListWidthTab.js
const mockTab = {name:"1"}
import api from '../../utils/api.js'
var app = getApp()
let filterData={}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [mockTab,mockTab, mockTab],
    currentTypeIndex:0,
    productList:[],
    searchKey:"",
    page:1,
    showSearchPage:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let key = ""
    if(options.key!=null){
      key = options.key
    }
    this.setData({
      searchKey: key
    })
    this._getType()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this._getTypeProduct(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getType() {
    api.request({
      url: "PERSENT_TYPE",
      method: "GET",
      callback: (b, json) => {
        if (b) {
          this.setData({
            typeList: json.data
          })
          this._getTypeProduct()
        }
      }
    })

  },
  _getTypeProduct(isRefresh) {
    let page = isRefresh?1:(this.data.page+1)
    let type = this.data.typeList[this.data.currentTypeIndex]
    // cId	string	是	分类id
    // scoreSort	string	否	积分排序：1代表从高到低，2代表从低到高
    // capacitySort	string	否	容量排序：1代表从高到低，2代表从低到高
    // screenData	string	否	items格式：[{ itemId: [1, 2, 3], searchId: 1 }]
    // count	string	否	查询数量，默认20条
    // page	string	否	页码，从1开始
    let param = Object.assign({
      cId: type.id,
      keyWord: this.data.searchKey
    },
    filterData)

    console.log(param)
    api.request({
      url: "PRESENT_PRODUCT_LIST",
      method: "GET",
      showLoading: true,
      param:param,
      callback: (b, json) => {
        if (b) {
          let data =[]
          if(isRefresh){
            wx.stopPullDownRefresh()
          }else{
            data = this.data.productList
          }
          data = data.concat(json.data)
          this.setData({
            productList: json.data,
            page:page
          })
        }
      }

    })
  }, filterTabConfirm(e){
    console.log(e)
    filterData = e.detail
    this._getTypeProduct(true)
    this.setData({
      showSearchPage: false
    })
  },
  openSearchPage(e){
    console.log(e)
    this.setData({
      showSearchPage: true

    })
  },
  searchPageConfirm(e){
    console.log(e)
    let key = e.detail.key
    this.setData({
      searchKey:key,
      showSearchPage:false
    })
    this._getTypeProduct(true)
  },
  searchPageCancel(){
    this.setData({
      showSearchPage: false
    })
  },
  loadMore(){
    this._getTypeProduct(false)
  },
  productItemClick(e){
    let index = e.currentTarget.dataset.index
    let id = this.data.productList[index].goodsId
    wx.navigateTo({
      url: '/pages/product/productDetail?id='+id,
    })
  }
})