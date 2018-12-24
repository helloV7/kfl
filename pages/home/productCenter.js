// pages/home/productCenter.js
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[],
    currentTab:0,
    productList:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
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
    this._getProductType().then(
      (b) => {
        this._getProductList(true)
      }
    )
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
    this._getProductList(true)
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

  _getProductType(){
   return new Promise((resolve,reject)=>{
      api.request({
        url:"PRODUCT_TYPE",
        method:"GET",
        showLoading:true,
        callback:(b,json)=>{
          if(b){
            this.data.tabs = json.data
            this.setData({
              tabs: this.data.tabs
            })
          }
          resolve(b)
          return b
        }
      })
    })
  },
  _getProductList(isRefresh){
    return new Promise((resolve,reject) =>{
      var page
      if (isRefresh) {
        page = 1
      } else {
        page = this.data.page + 1
      }
      if (this.data.tabs.length == 0) {
        return
      }
      let cuTab = this.data.tabs[this.data.currentTab]

      console.log(this.data.tabs)
      console.log(this.data.currentTab)
      api.request({
        url: "PRODUCT_LIST_OF_TYPE",
        method: "GET",
        param: {
          cId: cuTab.id,
          page: page
        },
        callback: (b, json) => {
          if (b) {
            var productList
            if (isRefresh) {
              productList = []
              wx.stopPullDownRefresh()
            } else {
              productList = this.data.productList

            }
            productList = productList.concat(json.data)
            this.setData({
              productList: productList,
              page: page
            })
            resolve(b)
            return b
          }
        }
      })
    })
    
  },
  onTabClick(e){
    var index = e.detail.index
    this.setData({
      currentTab:index
    })
    this._getProductList(true)
  },
  toDetail(e){
    console.log(e)
    let id = e.detail.goodsId;
    wx.navigateTo({
      url: '/pages/product/productDetail?id='+id,
    })
  },
  next(){
    this._getProductList(false)
  }
})