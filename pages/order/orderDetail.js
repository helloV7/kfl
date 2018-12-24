// pages/order/orderDetail.js
import api from '../../utils/api.js'
var app = getApp()
let orderNo
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],
    orderType:0, // 生成订单  1代付款 2待发货 3待收货 4已完成
    data:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    orderNo = options.orderNo
    this._getData()
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
  _getData(){
    api.request({
      url:"ORDER_DETAIL",
      method:"GET",
      showLoading:true,
      param:{
        orderNo:orderNo
      },
      callback:(b,json)=>{
        if(b){
          let productPrice = Number.parseFloat(json.data.payFee) - Number.parseFloat(json.data.trackPrice)
          json.data.productPrice = productPrice
          json.data.price = price
          this.setData({
            data:json.data
          })
        }
      }
    })
  }
})