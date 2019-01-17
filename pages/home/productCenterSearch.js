// pages/home/productCenterSearch.js
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    page: 1,
    showSearchPage: false,
    keyword:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this._getProductList(true)
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
    // this._getProductList()
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
  _getProductList(isRefresh) {
    return new Promise((resolve, reject) => {
      var page
      if (isRefresh) {
        page = 1
      } else {
        page = this.data.page + 1
      }
     


      api.request({
        url: "PRODUCT_LIST_OF_TYPE",
        method: "GET",
        param: {
          keyWord: this.data.keyword,
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

  },toDetail(e) {
    console.log(e)
    let id = e.currentTarget.dataset.goodsId;
    wx.navigateTo({
      url: '/pages/product/productDetail?id=' + id,
    })
  },
  loadmore() {
    this._getProductList(false)
  },
  searchViewClick(e) {
    this.setData({
      showSearchPage:true
    })
  },
  searchConfirm(e) {
    let key = e.detail.key
    this.setData({
      showSearchPage: false,
      keyword:key
    })
    this._getProductList(true)

  }
})