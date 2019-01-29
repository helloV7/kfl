// pages/home/productCenter2.js
import api from '../../utils/api.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[],
    banner:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getProductType()
    this.getBanner()
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
  _getProductType() {
    return new Promise((resolve, reject) => {
      api.request({
        url: "PRODUCT_TYPE",
        method: "GET",
        showLoading: true,
        callback: (b, json) => {
          if (b) {
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
  click(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    wx.navigateTo({
      url: '/pages/home/productCenterTypeList?cId=' + this.data.tabs[index].id + '&title=' + this.data.tabs[index].name,
    })
  },
  getBanner(){
    api.request({
      url:"GET_BANNER",
      param:{
        type	:"2"
      },
      callback:(b,json)=>{
          if(b){
            this.setData({
              banner:json.data
            })
          }
      }
    })
  },
  onBannerClick(e) {
    let index = e.currentTarget.dataset.index

    let banner = this.data.banner[index]

    switch (banner.slideType) {
      case "1":
        wx.navigateTo({
          url: '/pages/home/webview?src=' + banner.extra,
        })
        break;
      case "2":
        wx.navigateTo({
          url: '/pages/product/productDetail?id=' + banner.extra,
        })
        break;
    }
  },
})